import directorModel from '../models/director';
import { hashedPassword, compareHashedPassword } from '../helpers/bcrypt';
import generateToken from '../helpers/tokenGenerator';
import farmerModel from "../models/farmer";


class DirectorController {
    static async signup(req, res) {
        const { name,email, password, phone } = req.body;
        try {
            
            const hashedPwd = await hashedPassword(password);
            
            
            const director = new directorModel({
                name,
                email,
                phone,
                password: hashedPwd,
            });

            
            const data = await director.save();
            const token = await generateToken(email);

            res.status(200).json({ "message": "Director successfully registered", "token": token });
        } catch (error) {
            if (error.code === 11000) {
                res.status(405).json({ "message": "Email is already in use" });
            } else {
                res.status(400).json({ "message": "An error occurred while signing up" });
                console.log(error);
            }
        }
    }

    static async login(req, res) {
        const { email, password } = req.body;

        try {
            
            const director = await directorModel.findOne({ email });

            if (!director) {
                res.status(401).json({ "message": "Director not found" });
                return;
            }

            
            const isPasswordValid = await compareHashedPassword(password, director.password);

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
    

    static async getAllUsers  (req, res) {
        try {
          const reports = await farmerModel.find();
          res.status(200).json({ reports });
        } catch (error) {
          res.status(500).json({ error: 'Internal server error' });
        }
      };
    
}

export default DirectorController;
