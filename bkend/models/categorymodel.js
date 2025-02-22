const mongoose = require("mongoose");

const subcategorySchema = new mongoose.Schema({
    "_id": String,
    "name": String,
    "category": { type: String, ref: 'Category' }
});

const Subcategory = mongoose.model("Subcategory", subcategorySchema);
module.exports = Subcategory;