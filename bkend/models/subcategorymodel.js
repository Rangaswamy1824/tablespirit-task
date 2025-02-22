const mongoose = require("mongoose");

const subcategorySchema = new mongoose.Schema({
    _id: String,
    name: String,
    category: { type: String, ref: "Category" }
});

// Prevent re-registering the model if it already exists
const Subcategory = mongoose.models.Subcategory || mongoose.model("Subcategory", subcategorySchema);

module.exports = Subcategory;