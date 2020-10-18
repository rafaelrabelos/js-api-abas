import { Schema, model } from "mongoose";
import { IVendedoresDocument }  from "./Vendedores.Types";

export const VendedoresSchema = new Schema({
  nome: { type: String, required: true},
  email : { type : String, unique : true, lowercase:true, required : true },
  criadoEm : { type : Date, default : Date.now },
},
{
  toObject: {virtuals:true},
  toJSON:{virtuals:true}
});

VendedoresSchema.virtual('vendas', {
  ref: 'Vendas',
  localField: '_id',
  foreignField: 'vendedor_id',
  justOne: false
});

export const VendedoresModel = model<IVendedoresDocument>("Vendedores", VendedoresSchema);

