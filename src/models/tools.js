const mongoose = require("mongoose");

const toolSchema = new mongoose.Schema({
    materials: {
        type: String,
    }
});

const Tool = mongoose.model("Tool", toolSchema);

module.exports = Tool;
