const express = require('express');
const countController = require('../controllers/countController');

const router = express.Router();

router.get('/farmer-count', countController.countUsers);
router.get('/requested-count', countController.countRequested);
router.get('/respond-count', countController.countResponde);
router.get('/mateliars-count', countController.countMateliars);
router.get('/director-count', countController.countDirector);
router.get('/feedback-count', countController.countfeedback);

module.exports = router;
