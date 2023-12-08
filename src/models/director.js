import { Schema, model } from 'mongoose'

const DirectorSchema = new Schema ({
    name: {
        type: String,
        required: true 
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    
    password: {
        type: String,
        required: true
    },
    
    role:{
        type: String,
        default: "DIRECTOR",
    }

})

const directorModel=model("director",DirectorSchema);

export default directorModel;