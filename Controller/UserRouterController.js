import express from 'express';
import {signIn, signUp} from "../Service/ServiceImplentation/UserServiceImplementation.js"




const userRouterController = express.Router();

userRouterController.post("/signin", signIn);
userRouterController.post("/signup", signUp);



export default userRouterController;



