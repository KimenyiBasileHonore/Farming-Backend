import { Schema, model } from 'mongoose'

const AdminSchema = new Schema ({
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
        default: "ADMIN",
    }

})

const adminModel=model("admin",AdminSchema);

export default adminModel;