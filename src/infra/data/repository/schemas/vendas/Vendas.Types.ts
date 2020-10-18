import { Decimal128, ObjectID } from "mongodb";
import { Document, Model } from "mongoose";

export interface IVendas  {
    vendedor_id: ObjectID;
    data_venda: Date;
    valor: Decimal128;
}
export interface IVendasDocument extends IVendas, Document {}
export interface IVendasModel extends Model<IVendasDocument> {}
