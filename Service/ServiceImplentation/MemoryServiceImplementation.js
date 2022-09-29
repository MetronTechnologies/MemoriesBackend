import mongoose from "mongoose";
import TheMemory from "../../Model/TheMemory.js";
import { FindTheMemory, FindTheMemoryById, FindTheMemoryByIdAndRemove, FindTheMemoryByIdAndUpdate1, Save } from "../MemoryService.js";



async function getMemories(request, response) {
    const { page } = request.query;
    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT;
        const total = await TheMemory.countDocuments({});
        // const memory = await FindTheMemory();
        const posts = await FindTheMemory().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
        // response.status(200).json(memory);
        response.status(200).json({data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total/LIMIT)});
    } catch (error) {
        response.status(404).json(
            {
                message: error.message
            }
        );
    }
}

async function getMemory(request, response) {
    const { id } = request.params;
    try {
        const memory = await FindTheMemoryById(id);
        response.status(200).json(memory);
        console.log(memory)
    } catch (error) {
        response.status(404).json(
            {
                message: error.message
            }
        )
    }
}

async function getPostsBySearch(request, response) {
    const { searchQuery, tags } = request.query;
    try {
        const title = new RegExp(searchQuery, 'i');
        const posts = await TheMemory.find(
            {
                $or: [
                    { title },
                    {
                        tags: {
                            $in: tags.split(',')
                        }
                    }
                ]
            }
        )
        response.json(
            {
                data: posts
            }
        );
    } catch (error) {
        response.status(404).json(
            {
                message: error.message
            }
        )
    }
}


async function createMemory(request, response) {
    const post = request.body;
    const newMemory = new TheMemory(
        {
            ...post,
            creator: request.userId,
            createdAt: new Date().toISOString()
        }
    );
    try {
        await Save(newMemory)
        response.status(201).json(newMemory);
    } catch (error) {
        response.status(409).json({ message: error });
    }
}


async function deleteMemory(request, response) {
    const { id } = request.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return (
            response.status(404).send(`No image with id: ${id}`)
        )
    } else {
        await FindTheMemoryByIdAndRemove(id);
        response.json(
            {
                message: "Image deleted successfully"
            }
        );
    }
}

async function updateMemory(request, response) {
    const { id } = request.params;
    const { title, message, creator, tags, image } = request.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return (
            response.status(404).send(`No post with id: ${id}`)
        );
    }
    const updatedImage = { title, message, creator, tags, image, _id: id };
    await FindTheMemoryByIdAndUpdate1(id, updatedImage, { new: true });
    response.json(updatedImage);
}


async function likeMemory(request, response) {
    const { id } = request.params;
    if (!request.userId) {
        return response.json(
            {
                message: "Unauthenticated"
            }
        );
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return (
            response.status(404).send(`No post with id: ${id}`)
        );
    }
    const post = await FindTheMemoryById(id);
    const index = post.likes.findIndex(
        (id) => id === String(request.userId)
    )
    if (index === -1) {
        post.likes.push(request.userId)
    } else {
        post.likes = post.likes.filter(
            (id) => id !== String(request.userId)
        )
    }
    const updatedImage = await TheMemory.findByIdAndUpdate(id, post, { new: true });
    response.json(updatedImage);
    // const newLike = post.likeCount + 1;
    // const updatedImage = await TheMemory.findByIdAndUpdate(id, { likeCount: newLike }, { new: true });

    // else {
    //     const post  = await FindTheMemoryById(id);
    //     console.log(post);
    //     const newLike = post.likeCount + 1;
    //     const updatedImage = await TheMemory.findByIdAndUpdate(id, {likeCount: newLike}, {new: true});
    //     response.json(updatedImage);
    // }
}

async function commentMemory(request, response) {
    const { id } = request.params;
    const { theComment } = request.body;
    const post = await FindTheMemoryById(id);
    post.comments.push(theComment);
    const updatedPost = await TheMemory.findByIdAndUpdate(id, post, { new: true})
    response.json(updatedPost)
}




export { getMemories, createMemory, getMemory, deleteMemory, updateMemory, likeMemory, getPostsBySearch, commentMemory }




