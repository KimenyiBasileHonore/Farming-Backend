const mongoose = require('mongoose');

const askingDonationSchema = new mongoose.Schema({
  firstName: String,
  email: String,
  phone: String,
  // description: String,
  attachment: [{
    path: String,
  }],
  selectedMaterials: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tool',
  }],
  selected: { type: Boolean, default: false }, 

  date: {
    type: Date,
    default: Date.now,
  },
});

const donationForm = mongoose.model('DonationForm', askingDonationSchema);

module.exports = donationForm;
