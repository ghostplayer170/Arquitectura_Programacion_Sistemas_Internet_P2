import { Request, Response } from "npm:express@4.18.2";
import InvoiceModel from "../db/Invoice.ts";
import ClientModel from "../db/Client.ts";

const addInvoice = async (req: Request, res: Response) => {
  try {
    const { client, products, total } = req.body;
    
    products.map((elem: string)=>{ return { name: elem, price: 12 } })

    if(!await ClientModel.findOne({ client }).exec()){
      res.status(400).send("Client not found");
      return;
    }

    if (!client || !products || !total) {
      res.status(400).send("Client, total and products are required");
      return;
    }

    const newInvoice = new InvoiceModel({ client, products, total });
    await newInvoice.save();
    
    res.status(200).send({
      client: newInvoice._id.toString(),
      products: newInvoice.products,
      total: newInvoice.total,
    });
    
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default addInvoice;