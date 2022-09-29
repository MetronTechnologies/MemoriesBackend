import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import TheUser from "../../Model/TheUser.js";
import { Create, FindOne } from '../UserService.js';



async function signIn(request, response) {
    const { email, password } = request.body;
    try {
        const existingUser = await FindOne({email});
        // const existingUser = await TheUser.findOne({email});
        if (!existingUser) {
            return response.status(404).json(
                {
                    message: "User doesn't exist"
                }
            )
        }
        const passVerify = await bcrypt.compare(password, existingUser.password);
        if (!passVerify) {
            return response.status(400).json(
                {
                    message: "Invalid credentials"
                }
            )
        }
        const token = jwt.sign(
            {
                email: existingUser.email,
                id: existingUser._id
            },
            'test',
            {
                expiresIn: "1h"
            }
        );
        response.status(200).json(
            {
                userToken: existingUser, token
            }
        )

    } catch (error) {
        response.status(500).json(
            {
                message: "Something went wrong"
            }
        )
    }
}


async function signUp(request, response) {
    console.log("Accessing sign up")
    const {firstname, lastname, email, password, confirmPassword} = request.body;
    if(firstname){
        console.log("firstname gotten")
    }
    try {
        const existingUser = await FindOne({email});
        if (existingUser) {
            return response.status(400).json(
                {
                    message: "User already exist"
                }
            )
        }
        if(password !== confirmPassword){
            return response.status(400).json(
                {
                    message: "Passwords doesn't match"
                }
            )
        }
        const hashedPass = await bcrypt.hash(password, 12);
        const newUser = new TheUser(
                {
                    name: `${firstname} ${lastname}`,
                    email,
                    password: hashedPass
                }
            )
        const result = await Create(newUser);
        const token = jwt.sign(
            {
                email: result.email,
                id: result._id
            },
            'test',
            {
                expiresIn: "1h"
            }
        );
        response.status(200).json(
            {
                userToken: result, token
            }
        )
    } catch (error) {
        response.status(500).json(
            {
                message: "Something went wrong"
            }
        )
    }
}



export {signIn, signUp}



