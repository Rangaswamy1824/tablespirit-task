let mongoose = require("mongoose")
let prodsch = new mongoose.Schema({
    "_id": String,
    "name": String,
    "cat": String,
    "desc": String,
    "price": Number,
    "pimg": String,
    "dct": Number,
    "subcategory": { type: String, ref: 'Subcategory' },
    "reviews": []

})
let pm = new mongoose.model("prod", prodsch)
module.exports = pm