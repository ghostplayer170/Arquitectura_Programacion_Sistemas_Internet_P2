import { Request, Response } from "npm:express@4.18.2";
import ProductsModel from "../db/Products.ts";

// Esta función maneja una solicitud para eliminar un producto.
const deleteProducts = async (req: Request, res: Response) => {
  try {
    // Obtiene el id del producto de los parámetros de la solicitud.
    const { id } = req.params;
    
    // Busca y elimina el producto con el id otorgado.
    const Product = await ProductsModel.findOneAndDelete({ _id: id }).exec();

    // Si no encuentra producto.
    if (!Product) {
      res.status(404).send("Product not found");
      return;
    }
    
    // Caso contrario, se elimina correctamente, envía un mensaje de producto eliminado.
    res.status(200).send("Product deleted");

  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default deleteProducts;