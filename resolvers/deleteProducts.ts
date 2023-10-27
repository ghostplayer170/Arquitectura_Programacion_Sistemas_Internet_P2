import { Request, Response } from "npm:express@4.18.2";
import ProductsModel from "../db/Products.ts";

const deleteProducts = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const Products = await ProductsModel.findOneAndDelete({ id }).exec();
    if (!Products) {
      res.status(404).send("Product not found");
      return;
    }
    res.status(200).send("Product deleted");
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default deleteProducts;