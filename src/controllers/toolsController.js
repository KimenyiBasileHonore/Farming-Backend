const Tool = require("../models/tools");
import Farmer from '../models/farmer';
import AssignedModel from '../models/assignedMaterials';
import DonationForm from '../models/donationForm';
exports.createTool = async (req, res) => {
    try {
        const { materials } = req.body;


        const newTool = new Tool({ materials });


        await newTool.save();

        res.status(201).json(newTool);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};


exports.updateTool = async (req, res) => {
    try {
        const { id } = req.params;
        const { materials } = req.body;


        const updatedTool = await Tool.findByIdAndUpdate(id, { materials }, { new: true });

        if (!updatedTool) {
            return res.status(404).send("Tool not found");
        }

        res.json(updatedTool);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

exports.deleteTool = async (req, res) => {
    try {
        const { id } = req.params;


        const deletedTool = await Tool.findByIdAndRemove(id);

        if (!deletedTool) {
            return res.status(404).send("Tool not found");
        }

        res.json(deletedTool);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

exports.getAllTools = async (req, res) => {
    try {
        const tools = await Tool.find();
        res.status(200).json({ tools });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateToolMaterials = async (req, res) => {
    try {
        const { user, selectedMaterials } = req.body;
        const donationForm = await DonationForm.findOne({ email: user });

        if (!donationForm) {
            return res.status(404).json({ error: 'Donation form not found' });
        }

        // Check if the user already has assigned materials
        const existingAssignment = await AssignedModel.findOne({ user: donationForm._id });

        if (existingAssignment) {
            // If the user already has assigned materials, append the new materials
            existingAssignment.tools.push(...selectedMaterials);
            await existingAssignment.save();
        } else {
            // If no assignment exists for the user, create a new one
            const assignedTools = new AssignedModel({
                user: donationForm._id,
                tools: selectedMaterials
            });
            await assignedTools.save();
        }

        res.status(200).json({ message: "Materials assigned successfully" });
    } catch (error) {
        console.error('Error assigning materials:', error);
        res.status(500).json({ error: "Internal server error" });
    }
};



exports.getAssignedTools = async (req, res) => {
    try {
        const donation = await DonationForm.findOne({ email: req.user.email });
        const tools = await AssignedModel.find({ user: donation._id }).populate('tools').populate('user');

        // Extract tool names from the tools array
        const toolsNames = tools.map(tool => tool.tools.map(t => t.materials)).flat();

        res.status(200).json(toolsNames);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
};


exports.AllAssignedTools = async (req, res) => {
    try {
        
        const tools = await AssignedModel.find().populate({ path: 'tools', model: 'Tool' }).populate('user');

       
        const toolsWithUsers = tools.map(tool => ({
            user: {
                name: tool.user.name,
                email: tool.user.email,
                
            },
            tools: tool.tools.map(t => t.materials)
        }));

        res.status(200).json(toolsWithUsers);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

