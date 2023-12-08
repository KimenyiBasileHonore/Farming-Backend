const express = require('express');
import rabController from "../controllers/rabController"

const router = express.Router();

router.post('/accepting-forms', rabController.form);
router.get('/accepting-forms', rabController.form);

module.exports = router;
