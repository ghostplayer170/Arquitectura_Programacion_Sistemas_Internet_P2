import mongoose from "npm:mongoose@7.6.3";
import { Products } from "../types.ts";

const Schema = mongoose.Schema;

const productsSchema = new Schema(
  {
    name: { type: String, required: true },
    stock: { type: Number, required: false , default: 0},
    description: { type: String, required: false },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

export type ProductsModelType = mongoose.Document & Omit<Products, "id">;

export default mongoose.model<ProductsModelType>("Products", productsSchema);