import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import memoryRouterController from './MemoryRouterController.js';
import userRouterController from './UserRouterController.js';
dotenv.config();
const app = express();
app.use(bodyParser.json({
    limit: "30mb",
    extended: true
}));
app.use(bodyParser.urlencoded({
    limit: "30mb",
    extended: true
}));
app.use(cors());
app.use('/memories', memoryRouterController);
app.use('/user', userRouterController);
app.get("/", (request, response) => {
    response.send("App is running");
})
const connection_url = process.env.CONNECTION_URL;
const port = process.env.PORT; 
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
mongoose
    .connect(connection_url)
    .then(
        () => {
            console.info("Connected to the database");
        }
    )
    .then(
        app.listen(port, () => {
            console.log("Server running at port ", port);
        })
    )
    .catch(
        error => {
            console.log("Error: ", error);
        }
    )










