import jwt from 'jsonwebtoken';
import farmer from '../models/farmer';

const checkAuth = async (req, res, next) => {
    const token = req.header("Authorization");


  try {
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const user = jwt.verify(token, process.env.TOKEN_SECRET);
    const person = await farmer.findOne({ email: user.email });

    if (!person) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = person;
    console.log(person);
    next();
} catch (error) {
    console.error(error);
  
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: "Authentication token expired" });
    }
  
    return res.status(401).json({ message: "Invalid token" });
  }
  
};

export default checkAuth;
