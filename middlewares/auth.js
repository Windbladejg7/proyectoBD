import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const SECRETO = process.env.JWT_SECRET;

export default function authWithToken(req, res, next){
    const token = req.headers.authorization;
    console.log(req.headers);
    if(!token){
        return res.status(401).json({error: "Se necesita token"});
    }
    const user = jwt.verify(token, SECRETO);
    req.usuario = user;
    next();
}