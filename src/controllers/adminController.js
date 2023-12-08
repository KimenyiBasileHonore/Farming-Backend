import adminModel from '../models/admin';
import { hashedPassword, compareHashedPassword } from '../helpers/bcrypt';
import generateToken from '../helpers/tokenGenerator';


class AdminController {
    static async signup(req, res) {
        const { name,email, password,phone } = req.body;
        try {
            
            const hashedPwd = await hashedPassword(password);
            
            
            const admin = new adminModel({
                name,
                email,
                phone,
                password: hashedPwd,
            });

            
            const data = await admin.save();
            const token = await generateToken(email);

            res.status(200).json({ "message": "Admin successfully registered", "token": token });
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
            
            const admin = await adminModel.findOne({ email });

            if (!admin) {
                res.status(401).json({ "message": "Admin not found" });
                return;
            }

            
            const isPasswordValid = await compareHashedPassword(password, admin.password);

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

}

export default AdminController;
