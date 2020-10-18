import { Request, Response, NextFunction } from "express";
import { VendasRespository } from '@infra/data/repository/VendasRespository';
import { VendasModel } from "@infra/data/repository/schemas/vendas/Vendas.Schema";

const vendasRepository = new VendasRespository();

export class VendasService {
  constructor() {}

  async GetVendas(req: Request, res: Response, next: NextFunction) {

    await vendasRepository.GetVendas()
    .then( (result) =>{
      res.status(200).send(result);
    })
    .catch( (err)=>{
      res.status(500).send(err);
    });
  }

  async CreateVenda(req: Request, res: Response, next: NextFunction) {

    if (req.body.vendedor_id && req.body.data_venda && req.body.valor){
      let venda = new VendasModel(req.body);
      await vendasRepository.CreateVenda(venda)
      .then( (result) => {
        res.status(200).send(result);
      })
      .catch( (err)=>{
        res.status(500).send(err);
      });
    }

    res.status(400).send({erro:"Dados ausentes", dados: ["vendedor_id", "data_venda", "valor"]});
  }
}
