import express from "express";
import dotenv from "dotenv";
import servicios from "./routes/servicios.routes.js";
import pedidos from "./routes/pedidos.routes.js";
import auth from "./routes/auth.routes.js";
import clientes from "./routes/clientes.routes.js";
import payload from "./middlewares/auth.js";

import path from "node:path";
import { accesoRestringido } from "./middlewares/admin.js";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // servir carpeta public


app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.get("/register", (req, res)=>{
  res.sendFile(path.join(__dirname, "public", "register.html"));
})

app.get("/verPedidos", (req, res)=>{
    res.sendFile(path.join(__dirname, "public", "pedidos.html"));
});

app.get("/adminlogin", (req, res)=>{
    res.sendFile(path.join(__dirname, "public", "adminLogin.html"));
});

app.get("/misPedidos", (req, res)=>{
    res.sendFile(path.join(__dirname, "public", "Mis pedidos.html"));
});

app.use("/servicios", servicios);
app.use("/pedidos", payload, pedidos);
app.use("/auth", auth);
app.use("/cliente", payload, clientes);

app.listen(PORT, ()=>console.log(`Escuchando en el puerto ${PORT}`));