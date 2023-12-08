import farmerModel from '../models/farmer';
import generateToken from '../helpers/tokenGenerator';
import { hashedPassword, compareHashedPassword } from '../helpers/bcrypt'; 
import tools from "../models/tools"

class farmerController {
        static async signup(req, res) {
            const { name, email, password, phone } = req.body;
            try {
                console.log('Received signup request:', req.body);
    
                const hashedPwd = await hashedPassword(password);
                
                const user = new farmerModel({
                    name,
                    email,
                    password: hashedPwd,
                    phone,
                    role: "FARMER",
                });
    
                const data = await user.save();
                const token = await generateToken(email);
    
                console.log('User saved successfully:', data);
    
                res.status(200).json({ "message": "Successfully saved", "token": token });
            } catch (error) {
                console.error('Error during signup:', error);
    
                if (error.code === 11000) {
                    console.log('Email or phone might be used');
                    res.status(405).json({ "message": "Email or phone might be used" });
                } else {
                    console.log('Other error:', error.message);
                    res.status(400).json(error.message);
                }
            }
        }

    static async login(req, res) {
        const { email, password } = req.body;

        try {
            const user = await farmerModel.findOne({ email });

            if (!user) {
                res.status(401).json({ "message": "User not found" });
                return;
            }

            const isPasswordValid = await compareHashedPassword(password, user.password); 

            if (!isPasswordValid) {
                res.status(401).json({ "message": "Invalid password" });
                return;
            }

            const token = await generateToken(email);
            res.status(200).json({ "message": "Login successful", "token": token });
        } catch (error) {
            res.status(500).json({ "message": "An error occurred while logging in" });
        }
    }
    static async receiveHelp(req, res) {
        try {
          const { _id: farmerId } = req.user; 
    
          const farmer = await farmerModel.findById(farmerId);
    
          if (!farmer) {
            return res.status(404).json({ message: 'Farmer not found' });
          }
    
          const reports = await AcceptingForm.find({ farmer: farmerId });
    
          const selectedMaterials = reports.map(report => report.selectedMaterials).flat();
    
          res.status(200).json({ farmer, selectedMaterials });
        } catch (error) {
          console.error('Error during receiving help:', error);
          res.status(500).json({ message: 'An error occurred while fetching farmer and selected materials data' });
        }
      }

      static async assignMaterialsToEmails(req, res) {
        try {
            const { emails, selectedMaterials } = req.body;
        
            
            const result = await donationForm.updateMany({ email: { $in: emails } }, { $set: { selectedMaterials } });
        
            res.status(200).json({ message: "Materials assigned successfully", result });
          } catch (error) {
            console.error('Error assigning materials:', error);
            res.status(500).json({ error: "Internal server error" });
          }
    }
    }
    

    

export default farmerController;
