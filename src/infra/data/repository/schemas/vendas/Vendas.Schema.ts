import { Schema, model } from "mongoose";
import { IVendasDocument }  from "./Vendas.Types";
import { Decimal128, ObjectID } from "mongodb";

export const VendaSchema = new Schema({
  vendedor_id: { type: ObjectID, ref : 'Vendedores'},
  data_venda: { type: Date,  default: new Date() },
  valor: {type: Decimal128, default: 0}
});

export const VendasModel = model<IVendasDocument>("Vendas", VendaSchema);