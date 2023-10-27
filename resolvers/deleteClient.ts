import { Request, Response } from "npm:express@4.18.2";
import ClientModel from "../db/Client.ts";

const deleteClient = async (req: Request, res: Response) => {
  try {
    const { cif } = req.params;
    const Client = await ClientModel.findOneAndDelete({ cif }).exec();
    if (!Client) {
      res.status(404).send("Client not found");
      return;
    }
    res.status(200).send("Client deleted");
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default deleteClient;