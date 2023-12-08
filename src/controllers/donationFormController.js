const multer = require("multer");
import upload from "../middleware/multerConfig";
import donationForm from "../models/donationForm";


exports.donationReport = async (req, res) => {
  try {
    console.log('Request received');

    upload.array('attachment')(req, res, async (err) => {
      console.log('Inside upload.array callback');

      if (err instanceof multer.MulterError) {
        console.error('File upload error:', err);
        return res.status(400).json({ error: 'File upload error' });
      } else if (err) {
        console.error('Internal server error:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      const { firstName, email, phone, /*description, */} = req.body;
      const attachmentPaths = req.files.map((file) => file.filename);

      console.log('Received form data:', {
        firstName,
        email,
        phone,
        // description,
        attachment: { path: attachmentPaths }, 
      });
      

      const newReport = new donationForm({
        firstName,
        email,
        phone,
        // description,
        attachment: req.files.map((file) => ({ path: file.filename })),
      });

      console.log('Saving the report');

      const savedReport = await newReport.save();
      res.status(201).json({ message: "Donation report created successfully", report: savedReport });
    });
  } catch (error) {
    console.error('Catch block error:', error);
    res.status(500).json({ error: "Internal server error" });
  }
};




exports.getAllRequests = async (req, res) => {
  try {
    const reports = await donationForm.find();
    res.status(200).json({ reports });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.assignMaterialsToEmails = async (req, res) => {
  try {
    const { emails, selectedMaterials } = req.body;

    
    const result = await donationForm.updateMany({ email: { $in: emails } }, { $set: { selectedMaterials } });

    res.status(200).json({ message: "Materials assigned successfully", result });
  } catch (error) {
    console.error('Error assigning materials:', error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.selectDonationForm = async (req, res) => {
  try {
    const { formId } = req.params;

    const selectedForm = await donationForm.findByIdAndUpdate(
      formId,
      { $set: { selected: true } },
      { new: true }
    );

    res.status(200).json({ message: "Donation form selected successfully", form: selectedForm });
  } catch (error) {
    console.error('Error selecting donation form:', error);
    res.status(500).json({ error: "Internal server error" });
  }
};



exports.unselectDonationForm = async (req, res) => {
  try {
    const { formId } = req.params;

    const unselectedForm = await donationForm.findByIdAndUpdate(
      formId,
      { $set: { selected: false } },
      { new: true }
    );

    res.status(200).json({ message: "Donation form unselected successfully", form: unselectedForm });
  } catch (error) {
    console.error('Error unselecting donation form:', error);
    res.status(500).json({ error: "Internal server error" });
  }
};




exports.getSelectedDonationForms = async (req, res) => {
  try {
    const selectedForms = await donationForm.find({ selected: true });
    res.status(200).json({ selectedForms });
  } catch (error) {
    console.error('Error fetching selected forms:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


