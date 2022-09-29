import mongoose from "mongoose";
const Schema = mongoose.Schema;


const memorySchema = new Schema(
    {
        title: String,
        message: String,
        name: String,
        creator: String,
        tags: [String],
        image: String,
        // likeCount: {
        //     type: Number,
        //     default: 0
        // },
        likes: {
            type: [String],
            default: []
        },
        comments: {
            type: [String],
            default: []
        },
        createdAt: {
            type: Date,
            default: new Date(),
        }
    }
);

const TheMemory = mongoose.model("TheMemory", memorySchema);

// const imageSchema = new Schema(      
//     {
//         title:String,
//         image:String
//     },
//     {
//         timestamps: true,
//     }
// );
// const TheMemory = mongoose.model('images',imageSchema);


export default TheMemory;

