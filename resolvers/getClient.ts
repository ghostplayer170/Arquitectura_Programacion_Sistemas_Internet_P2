import { Response } from "npm:express@4.18.2";
import ClientModel from "../db/Client.ts";

// Esta función maneja una solicitud para obtener todos los clientes.
const getClient = async (req: Request, res: Response) => {
  try {
    
    // Busca todos los clientes en la base de datos
    const clients = await ClientModel.find({}).exec();

    // Si no se encuentran clientes.
    if (!clients) {
      res.status(404).send("Clients not found");
      return;
    }
    
    // Caso contrario, envía una respuesta con la lista de clientes.
    res.status(200).send({
        clients
    });

  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default getClient;