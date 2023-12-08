import  express  from "express";
const router = express.Router();
import directorController  from "../controllers/directorController"

router.post('/signup', directorController.signup);
router.post('/login', directorController.login);
router.get('/userlist', directorController.getAllUsers);




module.exports = router;
