import jwt, { decode } from "jsonwebtoken";
import { loadData } from "../utils/helpers.js";
const tokenKey = "12354hhsg@fr";


export const auth = (req,res,next)=>{

    const token = req.headers.authorization.split(" ")[1];
    if(!token){
        const err = new Error("unauthorized");
        err.statusCode = 401;
        next(err);
    }

    const decode = jwt.verify(token,tokenKey,(err,decode)=>{
        if(err){
            next(err);
        }
        return decode;
    });
    const {id}=decode;
    if(!id){
        const err = new Error("Access Denied");
        err.statusCode = 403;
        next(err);
    }
    const users=loadData("./controllers/db.json")

    const user = users.find(user =>user.id ===id);
    if(!user){
        const err = new Error("invalid Token");
        err.statusCode = 403;
        next(err);
    }
    req.user=user;
    next();
}