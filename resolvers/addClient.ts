import { Request, Response } from "npm:express@4.18.2";
import ClientModel from "../db/Client.ts";

// Esta función maneja una solicitud para agregar un nuevo cliente.
const addClient = async (req: Request, res: Response) => {
  try {
    // Obtiene el name y cif del cuerpo de la solicitud.
    const { name, cif } = req.body;
    
    // Verifica si el name o el cif están ausentes en la solicitud.
    if (!name || !cif) {
      res.status(400).send("Name and cif are required");
      return;
    }

    // Verifica si ya existe un cliente con el mismo cif en la base de datos.
    const alreadyExists = await ClientModel.findOne({ cif }).exec();

    if (alreadyExists) {
      res.status(400).send("Client already exists");
      return;
    }

    // Caso contrario, crea un nuevo cliente y lo guarda en la base de datos.
    const newClient = new ClientModel({ name, cif });
    await newClient.save();

    // Responde con los datos del nuevo cliente.
    res.status(200).send({
      name: newClient.name,
      cif: newClient.cif,
    });
    
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default addClient;