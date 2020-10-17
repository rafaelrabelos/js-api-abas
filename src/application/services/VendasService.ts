import { Request, Response, NextFunction } from "express";
import { VendasRespository } from '@infra/data/repository/VendasRespository';

export class VendasService {
  constructor() {}

  async CreateVenda(req: Request, res: Response, next: NextFunction) {
    
    const vendasRepository = new VendasRespository();

    res.status(201).send( await vendasRepository.CreateVenda() );
  }
}
