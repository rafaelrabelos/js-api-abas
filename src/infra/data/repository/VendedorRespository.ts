import { VendedoresModel } from './schemas/vendedor/Vendedores.Schema';
import * as VendedorTypes from './schemas/vendedor/Vendedores.Types'

export class VendedorRespository {
  constructor() {}

  async GetVendedores() : Promise<VendedorTypes.IVendedoresDocument[]>{
    return VendedoresModel.find().populate({ path: 'vendas', select: '-_id'});
  }

  async CreateVendedor(vendedor: VendedorTypes.IVendedoresDocument): Promise<VendedorTypes.IVendedoresDocument> {

    return VendedoresModel.create(vendedor);
  }
}