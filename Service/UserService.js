import TheUser from "../Model/TheUser.js";

function FindOne(email) {
    return TheUser.findOne(email);
}

function Create(user){
    return TheUser.create(user);
}



export {FindOne, Create}

