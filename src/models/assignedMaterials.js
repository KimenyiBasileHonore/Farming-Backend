import mongoose from 'mongoose';

const AssignedSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DonationForm' 
    },
    tools: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tool',
    }]    

})

const AssignedModel = mongoose.model("assigned", AssignedSchema);
export default AssignedModel;