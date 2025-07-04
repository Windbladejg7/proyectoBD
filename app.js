import express from "express";
import dotenv from "dotenv";
import servicios from "./routes/servicios.routes.js";
import pedidos from "./routes/pedidos.routes.js";
import auth from "./routes/auth.routes.js";
import clientes from "./routes/clientes.routes.js";
import payload from "./middlewares/auth.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use("/servicios", servicios);
app.use("/pedidos", payload, pedidos);
app.use("/auth", auth);
app.use("/clientes", clientes);

app.listen(PORT, ()=>console.log(`Escuchando en el puerto ${PORT}`));