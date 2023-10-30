import { Response } from "npm:express@4.18.2";
import ProductsModel from "../db/Products.ts";

// Esta función maneja una solicitud para obtener todos los productos.
const getProducts = async (req: Request, res: Response) => {
  try {
    // Busca todos los productos en la base de datos
    const products = await ProductsModel.find({}).exec();

    // Si no se encuentran productos.
    if ( !products ) {
      res.status(404).send("Products not found");
      return;
    }
    
    // Caso contrario, envía una respuesta con la lista de productos.
    res.status(200).send({
        products
    });

  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default getProducts;