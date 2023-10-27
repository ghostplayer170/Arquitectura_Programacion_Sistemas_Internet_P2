import { Response } from "npm:express@4.18.2";
import ProductsModel from "../db/Products.ts";

const getProducts = async ( res: Response) => {
  try {
    const products = await ProductsModel.find({}).exec();
    if ( !products ) {
      res.status(404).send("Products not found");
      return;
    }/*
    products.filter((elem)=>{
      return {name: elem.name, stock: elem.stock, description: elem.description, price: elem.price}
    })*/
    res.status(200).send({
        products
    });
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default getProducts;