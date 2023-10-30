import mongoose from "npm:mongoose@7.6.3";
import { Client } from "../types.ts";

// Nuevo esquema de mongoose.
const Schema = mongoose.Schema;

// Se define esquema de cliente con dos propiedades: 'name' y 'cif'. 
// Ambas son obligatorias, y 'cif' también debe ser única.
const clientSchema = new Schema(
  {
    name: { type: String, required: true },
    cif: { type: String, required: true, unique: true },
  },
);

// Se crea un tipo 'ClientModelType' de tipo 'mongoose.Document' y 'Client' excluyendo la propiedad 'id'.
export type ClientModelType = mongoose.Document & Omit<Client, "id">;

// Se exporta el modelo de mongoose, asociándolo al esquema definido 'clientSchema' y al tipo de documento 'ClientModelType'.
export default mongoose.model<ClientModelType>("Client", clientSchema);