import { Request, Response, NextFunction } from "express";
import { VendedorRespository } from '@infra/data/repository/VendedorRespository';
import { VendedoresModel } from "@infra/data/repository/schemas/vendedor/Vendedores.Schema";

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
}
