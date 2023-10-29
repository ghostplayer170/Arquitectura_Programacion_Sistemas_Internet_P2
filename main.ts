import express from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";

import addProducts from "./resolvers/addProducts.ts";
import getProducts from "./resolvers/getProducts.ts";
import deleteProducts from "./resolvers/deleteProducts.ts";
import addClient from "./resolvers/addClient.ts";
import deleteClient from "./resolvers/deleteClient.ts";
import getInvoice from "./resolvers/getInvoice.ts";
import addInvoice from "./resolvers/addInvoice.ts";
import getClient from "./resolvers/getClient.ts";

import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";
const env = await load();

//const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL");

const MONGO_URL = "mongodb+srv://rmontenegrop:Lllubo6BT2sVncJg@clusteruni.pagju8q.mongodb.net/DataBaseStore?retryWrites=true&w=majority";
const PORT = 3010;

if (!MONGO_URL) {
  console.log("No mongo URL found");
  Deno.exit(1);
}

await mongoose.connect(MONGO_URL);

const app = express();
app.use(express.json());
app
  .post("/products", addProducts)
  .get("/products", getProducts)
  .delete("/products/:id", deleteProducts)
  .post("/client", addClient)
  .get("/client", getClient)
  .delete("/client/:dni", deleteClient)
  .post("/invoice", addInvoice)
  .get("/invoice/:id", getInvoice);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
