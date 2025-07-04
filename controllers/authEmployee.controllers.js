import pool from "../db/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export async function register(req, res){
    const {nombres, apellidos, genero, email, password} = req.body;
    const existente = await pool.query("SELECT * FROM EMPLEADO WHERE email=$1", [email]);
    if(existente.rows.length>0){
        return res.status(404).json({error:"Usuario ya existente"});
    }

    const hash = await bcrypt.hash(password, 10);
    const result = pool.query("INSERT INTO EMPLEADO(nombres, apellidos, genero, email, password) VALUES($1, $2, $3, $4, $5)", [nombres, apellidos, genero, email, hash]);
    res.sendStatus(200);
}

export async function login(req, res){
    const {email, password} = req.body;
    const result = await pool.query("SELECT * FROM EMPLEADO WHERE email=$1", [email]);
    const user = result.rows[0];
    console.log(user);
    if(!user){
        return res.sendStatus(401).json({error: "credenciales invalidas"});
    }

    const match = await bcrypt.compare(password, user.password);
    if(!match){
        return res.sendStatus(401).json({error: "credenciales incorrectas"});
    }
    const SECRETO = process.env.JWT_SECRET;
    const token = jwt.sign({id:user.id_empleado, email:user.email}, SECRETO, { expiresIn: "2h" });
    res.json({mensaje:"Login exitoso", token:token});
}