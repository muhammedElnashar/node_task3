import { v4 as uuid } from "uuid";
import path from "path";
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken";
import {loadData, saveData} from "../utils/helpers.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbFilePath = path.join(__dirname,"db.json");
const tokenKey = "12354hhsg@fr";
let users = [];
users = loadData(dbFilePath);


export const getAllUsers = (req, res) => {

  const { query } = req;

  if (Object.keys(query).length > 0) {
    const filterdUsers = users.filter((item) => item.age == query.age);
    res.status(200).json({ filterdUsers });
  }
  return res.status(200).json({ users })
};                                            

export const getUserById = (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user.id === id);
  res.status(200).json({ payload: user });
};

export const createUser = (req, res) => {
  const { body } = req;
  if (Object.keys(body).length === 0) {
    return res.status(404).json({ message: "data required" });
  }
  const id = uuid();
  users.push({ id, ...body });
  saveData(dbFilePath,users);
  res.status(201).json({ users });
};

export const login = (req,res)=>{
  const{email,password} = req.body
  const user =users.find((u)=>u.email === email);
  if(!user){
    return res.status(403).json({massage:"invalid Email"});
  }
  if(password !== user.password){
    return res.status(403).json({massage:"invalid Password"});
  }
  const token = jwt.sign({
    id : user.id,
    email : user.email
  },tokenKey);
 return res.status(200).json({token :token})  

}

export const updateUser = (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const index = users.findIndex((item) => item.id === id);
  if (index === -1) {
    res.status(404).json({ message: "no user found" });
  }
  users[index] = {
    ...users[index],
    ...body,
  };
  saveData(dbFilePath,users);
  res.status(200).json({ user: users[index] });
};

export const deleteUser = (req, res) => {
  const { id } = req.params;
  const index = users.findIndex((item) => item.id === id);
  users.splice(index, 1);
  saveData(dbFilePath,users);
  res.status(200).json({ user: users });
};
