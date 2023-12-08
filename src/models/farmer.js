import mongoose from 'mongoose';

const FarmerSchema = new mongoose.Schema({
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
        default: "FARMER",
    },
    selectedMaterials: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tool',
      }],
    
    
    

})

const farmerModel = mongoose.model("Farmer", FarmerSchema);
export default farmerModel;