const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    phoneNumber: Number,
    message: String
});

module.export = mongoose.model("Contact", contactSchema);