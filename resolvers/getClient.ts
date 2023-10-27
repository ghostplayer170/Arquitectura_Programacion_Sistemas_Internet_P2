import { Response } from "npm:express@4.18.2";
import ClientModel from "../db/Client.ts";

const getClient = async (res: Response) => {
  try {
    const clients = await ClientModel.find({}).exec();
    if (!clients || clients.length === 0) {
      res.status(404).send("Clients not found");
      return;
    }
    res.status(200).send({
        clients
    });
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default getClient;