import { Request, Response } from "npm:express@4.18.2";
import ProductsModel from "../db/Products.ts";

const addProducts = async (req: Request, res: Response) => {
  try {
    const { name, stock, description, price } = req.body;
    if (!name || !price) {
      res.status(400).send("Name and Price are required");
      return;
    }

    const alreadyExists = await ProductsModel.findOne({ name }).exec();

    if (alreadyExists) {
      res.status(400).send("Product already exists");
      return;
    }

    const newProducts = new ProductsModel({ name, stock, description, price });
    await newProducts.save();

    res.status(200).send({
      id: newProducts._id.toString(),
      name: newProducts.name,
      stock: newProducts.stock,
      description: newProducts.description,
      price: newProducts.price,
    });

  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default addProducts;