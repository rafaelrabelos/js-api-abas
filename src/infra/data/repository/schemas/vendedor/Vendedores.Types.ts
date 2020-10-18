import { Document, Model } from "mongoose";

export interface IVendedores  {
    nome: string;
    email: string;
    criadoEm: Date;
}
export interface IVendedoresDocument extends IVendedores, Document {}
export interface IVendedoresModel extends Model<IVendedoresDocument> {}
