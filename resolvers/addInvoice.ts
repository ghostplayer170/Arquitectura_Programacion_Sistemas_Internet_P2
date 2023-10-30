import { Request, Response } from "npm:express@4.18.2";
import InvoiceModel from "../db/Invoice.ts";
import ClientModel from "../db/Client.ts";
import ProductsModel from "../db/Products.ts";

// Esta función maneja una solicitud para agregar una nueva factura.
const addInvoice = async (req: Request, res: Response) => {
  try {
    // Obtiene el cliente, productos y total del cuerpo de la solicitud.
    const { client, products, total } = req.body;

    // Verifica si algun campo obligatorio se encuentra ausente en la solicitud.
    if (!client || !products || !total) {
      res.status(400).send("Client, total and products are required");
      return;
    }

    // Verifica si el cliente existe en la base de datos.
    const clientExists = await ClientModel.findOne({ _id: client }).exec();

    if(!clientExists){
      res.status(400).send("Client not found");
      return;
    }

    // Verifica si todos los productos se encuentran en la base de datos
    const allProductsExists = await Promise.all(products.map(async elem => {       
      const productExist = await ProductsModel.findOne({ name: elem }).exec();
      return !!productExist; // Convertir a booleano 
    }));
  
    const allProductsExist = allProductsExists.every(Boolean);

    if (!allProductsExist) {
      res.status(400).send("Some products are not found");
      return;
    } 

    // Caso contrario, crea una nueva factura y la guarda en la base de datos.
    const newInvoice = new InvoiceModel({ client, products, total });
    await newInvoice.save();
    
    // Responde con los datos de la nueva factura.
    res.status(200).send({
      client: newInvoice.client,
      products: newInvoice.products,
      total: newInvoice.total,
    });
    
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default addInvoice;