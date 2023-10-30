import { Request, Response } from "npm:express@4.18.2";
import ProductsModel from "../db/Products.ts";

// Esta función maneja una solicitud para agregar un nuevo producto.
const addProducts = async (req: Request, res: Response) => {
  try {
    // Extrae los datos del producto del cuerpo de la solicitud.
    const { name, stock, description, price } = req.body;

    // Verifica si los campos obligatorios están ausentes en la solicitud.
    if (!name || !price) {
      res.status(400).send("Name and Price are required");
      return;
    }

    // Verifica si el producto existe en la base de datos.
    const alreadyExists = await ProductsModel.findOne({ name }).exec();

    if (alreadyExists) {
      res.status(400).send("Product already exists");
      return;
    }

    // Si todo existe y es correcto, crea un nuevo producto y la guarda en la base de datos.
    const newProducts = new ProductsModel({ name, stock, description, price });
    await newProducts.save();

    // Responde con los datos del nuevo producto.
    res.status(200).send({
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