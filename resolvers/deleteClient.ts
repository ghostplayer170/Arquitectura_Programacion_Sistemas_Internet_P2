import { Request, Response } from "npm:express@4.18.2";
import ClientModel from "../db/Client.ts";

// Esta función maneja una solicitud para eliminar un cliente.
const deleteClient = async (req: Request, res: Response) => {
  try {
    // Obtiene el cif del cliente de los parámetros de la solicitud.
    const { cif } = req.params;

    // Busca y elimina el cliente con el CIF otorgado.
    const Client = await ClientModel.findOneAndDelete({ cif }).exec();

    // Si no encuentra cliente.
    if (!Client) {
      res.status(404).send("Client not found");
      return;
    }
    
    // Caso contrario, se elimina correctamente, envía un mensaje de cliente eliminado.
    res.status(200).send("Client deleted");

  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default deleteClient;