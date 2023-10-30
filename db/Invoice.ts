import mongoose from "npm:mongoose@7.6.3";
import { Invoice } from "../types.ts";

// Nuevo esquema de mongoose.
const Schema = mongoose.Schema;

// Se define esquema de invoice con tres propiedades: 'client', 'products' y 'total'. 
// Todas son obligatorias.
const invoiceSchema = new Schema(
  {
    client: { type: String, required: true },
    products: { type: [String], required: true },
    total: { type: Number, required: true },
  },
);

// Se crea un tipo 'InvoiceModelType' de tipo 'mongoose.Document' y 'Invoice' excluyendo la propiedad 'id'.
export type InvoiceModelType = mongoose.Document & Omit<Invoice, "id">;

// Se exporta el modelo de mongoose, asociándolo al esquema definido 'InvoiceSchema' y al tipo de documento 'InvoiceModelType'.
export default mongoose.model<InvoiceModelType>("Invoice", invoiceSchema);