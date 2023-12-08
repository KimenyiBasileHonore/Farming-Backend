import  express  from "express";
const router = express.Router();
import farmerController  from "../controllers/farmerController"

router.post('/signup', farmerController.signup);
router.post('/login', farmerController.login);
router.post('/received', farmerController.receiveHelp);


module.exports = router;
