import { Request, Response } from "npm:express@4.18.2";
import InvoiceModel from "../db/Invoice.ts";

// Esta función maneja una solicitud para obtener una factura.
const getInvoice = async (req: Request, res: Response) => {
  try {
    // Recoge el id de los parámetros de la solicitud.
    const { id } = req.params;

    // Busca la factura correspondiente al id proporcionado.
    const invoice = await InvoiceModel.findOne({ _id: id }).exec();

    // Si no encuentra la factura.
    if (!invoice) {
      res.status(404).send("Invoice not found");
      return;
    }
    // Caso contrario, envía una respuesta con la factura correspondiente.
    res.status(200).send({ invoice });

  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default getInvoice;