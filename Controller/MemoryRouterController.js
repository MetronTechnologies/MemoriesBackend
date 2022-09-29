import express from 'express';
import { createMemory, deleteMemory, getMemories, getMemory, getPostsBySearch, likeMemory, updateMemory, commentMemory } from "../Service/ServiceImplentation/MemoryServiceImplementation.js";
import Auth from '../MiddleWare/AuthMiddleWare.js';

const memoryRouterController = express.Router();

memoryRouterController.get('/get', getMemories);
memoryRouterController.get('/search', getPostsBySearch);
memoryRouterController.post('/create', Auth, createMemory);
memoryRouterController.get("/get/:id", getMemory);
memoryRouterController.delete("/delete/:id", Auth, deleteMemory);
memoryRouterController.put("/update/:id", Auth, updateMemory);
memoryRouterController.patch("/like/:id/likememory", Auth, likeMemory);
memoryRouterController.post("/comment/:id/commentMemory", Auth, commentMemory)




export default memoryRouterController;


