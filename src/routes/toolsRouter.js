const express = require("express");
const router = express.Router();
const toolsController = require("../controllers/toolsController");
import checkAuth from "../middleware/checkAuthentication";

router.post("/tools", toolsController.createTool);
router.put("/tools/:id", toolsController.updateTool);
router.put("/mateliarltools/:id", toolsController.updateToolMaterials);
router.delete("/tools/:id", toolsController.deleteTool);
router.get('/tools', toolsController.getAllTools);
router.get('/assigned',checkAuth, toolsController.getAssignedTools);
router.get('/allassigned', toolsController.AllAssignedTools);

module.exports = router;
