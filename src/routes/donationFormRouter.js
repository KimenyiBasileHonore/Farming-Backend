
const express = require("express");
const router = express.Router();
const { donationReport, getAllRequests,assignMaterialsToEmails,selectDonationForm,getSelectedDonationForms,unselectDonationForm } = require("../controllers/donationFormController");

router.post("/reports", donationReport);
router.get("/allrequests", getAllRequests);
router.put("/assign-materials", assignMaterialsToEmails);
router.patch("/select/:formId", selectDonationForm);
router.patch("/unselect/:formId", unselectDonationForm);
router.get("/selected-forms", getSelectedDonationForms);

module.exports = router;
