import { Request, Response, NextFunction } from "express";
import { VendedorRespository } from '@infra/data/repository/VendedorRespository';
import { VendedoresModel } from "@infra/data/repository/schemas/vendedor/Vendedores.Schema";
import { Decimal128 } from "mongodb";

const vendedorRepository = new VendedorRespository();

export class VendedorService {
  constructor() {}

  async GetVendedores(req: Request, res: Response, next: NextFunction) {

    await vendedorRepository.GetVendedores()
    .then( (result) =>{
      res.status(200).send(result);
    })
    .catch( (err)=>{
      res.status(500).send(err);
    });
  }

  async CreateVendedor(req: Request, res: Response, next: NextFunction) {

    if (req.body.nome && req.body.email){

      let vendedor = new VendedoresModel(req.body);

      await vendedorRepository.CreateVendedor(vendedor)
      .then( (result) => {
        res.status(200).send(result);
      })
      .catch( (err)=>{
        res.status(500).send(err);
      });
    }

    res.status(400).send({erro:"Dados ausentes", dados: ["nome", "email"]});
  }

  async ObtemRankingDaSemana(req: Request, res: Response, next: NextFunction){
    
    await vendedorRepository.GetVendedores()
    .then( async (result) =>{

      if(result == [] || !Array.isArray(result)){
        res.status(200).send("Sem vendedores");
      }

      let filtrados = (await FiltraVendasDaSemana(result)).map( (x) => {
        return {
          vendedor: x.nome,
          email: x.email,
          valor: x.mediaSemana
        }
      })

      filtrados.sort((a, b) => parseFloat(b.valor) - parseFloat(a.valor));

      res.status(200).send(filtrados.slice(0, 10));

    })
    .catch( (err)=>{
      res.status(500).send(err);
    });
  }

}

async function FiltraVendasDaSemana(vendedores: any[]){

  var diasSemana = ObtemSemanaCorrente();

  vendedores.forEach((val:{mediaSemana: string, vendas: any[]}, i) =>{

    var filtrados = val.vendas
    .filter((item) => item.data_venda.getFullYear() == diasSemana[0].getFullYear() )
    .filter((item) => item.data_venda.getMonth() == diasSemana[0].getMonth() )
    .filter((item) => diasSemana.map( x => x.getUTCDate())
      .includes(item.data_venda.getUTCDate())
    );

    val.vendas = filtrados;
    val.mediaSemana =  GeraMediaDiariaPorSemana(val.vendas).toFixed(2);
  });

  return vendedores;
}

function GeraMediaDiariaPorSemana(vendas: {data_venda: Date, valor: Decimal128}[]){

  var total: number = 0;
  var divisor: number;

  var diasSemana = ObtemSemanaCorrente();

  diasSemana.forEach((val: any, i) =>{
    
    var totalDia: number = 0;
    var divisorDia: number;

    vendas.filter( (x) =>  x.data_venda.getUTCDate() == val.getUTCDate())
    .forEach( (val, idx) =>{
      totalDia = totalDia + parseFloat(val.valor.toString());
      divisorDia = idx + 1;
    });
    total = total + (totalDia/divisorDia);
    divisor = i+1;
  });

  return total / divisor;
}

function ObtemSemanaCorrente() : Date[]{
  var dias: Date[] = []
  var diaAtual = new Date();
  var diaSemana = diaAtual.getDay();

  for(var a =diaSemana; a >= 0; a--){
    dias[a] = new Date();
    dias[a].setDate(diaAtual.getDate() - a);
  }
  
  return dias;
}