const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required:true,
    unique: true
   
},
  message: String,
  submissionDate: { type: Date, default: Date.now },
  isSeen: { type: Boolean, default: false },
});

module.exports = mongoose.model('Feedback', feedbackSchema);


// import mongoose from "mongoose";

// const feedbackSchema = new mongoose.Schema({
//   FirstName: {
//     type: String,
//     required: true,
//   },
//   LastName: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//   },
//   message: {
//     type: String,
//     required: true,
//   },
//   seen: {
//     type: Boolean,
//     default: false,
//   },
//   date: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const Feedback = mongoose.model("Feedback", feedbackSchema);

// export default Feedback;
