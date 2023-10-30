import mongoose from "npm:mongoose@7.6.3";
import { Products } from "../types.ts";

// Nuevo esquema de mongoose.
const Schema = mongoose.Schema;

// Se define esquema de products con cuatro propiedades: 'name', 'stock', 'price', y 'description'. 
const productsSchema = new Schema(
  {
    name: { type: String, required: true },
    stock: { type: Number, required: false , default: 0 },
    description: { type: String, required: false },
    price: { type: Number, required: true },
  },
);

// Se crea un tipo 'ProductsModelType' de tipo 'mongoose.Document' y 'Products' excluyendo la propiedad 'id'.
export type ProductsModelType = mongoose.Document & Omit<Products, "id">;

// Se exporta el modelo de mongoose, asociándolo al esquema definido 'ProductsSchema' y al tipo de documento 'ProductsModelType'.
export default mongoose.model<ProductsModelType>("Products", productsSchema);