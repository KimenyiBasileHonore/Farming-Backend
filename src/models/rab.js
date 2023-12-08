const mongoose = require("mongoose");

const rabFormSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['pending', 'accepted', 'declined'],
    default: 'pending'
  },
  farmer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Farmer"
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const acceptingForm = mongoose.model("AcceptingForm", rabFormSchema);

module.exports = acceptingForm;
