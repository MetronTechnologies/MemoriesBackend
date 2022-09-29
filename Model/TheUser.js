import mongoose from "mongoose";
const Schema = mongoose.Schema;


const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        id: {
            type: String
        }
    }
);

const TheUser = mongoose.model("TheUser", userSchema);



export default TheUser;




