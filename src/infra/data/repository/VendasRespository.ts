import { VendasModel } from './schemas/vendas/Vendas.Schema';
import * as VendasTypes from './schemas/vendas/Vendas.Types'
import { ObjectID } from "mongodb";

export class VendasRespository {
  constructor() {}

  async GetVendas() : Promise<VendasTypes.IVendasDocument[]>{
    return VendasModel.find().populate({ path: 'vendedor_id', select: '_id nome email'})
  }

  async CreateVenda(venda: VendasTypes.IVendasDocument): Promise<VendasTypes.IVendasDocument> {

    return VendasModel.create(venda);
  }
}