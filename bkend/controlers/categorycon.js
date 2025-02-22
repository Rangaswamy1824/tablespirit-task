// controllers/categorycon.js
const Category = require("../models/categorymodel")
const Subcategory = require("../models/SubcategoryModel")

let addCategory = async(req, res) => {
    try {
        let data = new Category({ _id: uuid(), name: req.body.name })
        await data.save()
        res.json({ "msg": "Category added" })
    } catch (err) { /* error handling */ }
}

let addSubcategory = async(req, res) => {
    try {
        let data = new Subcategory({
            _id: uuid(),
            name: req.body.name,
            category: req.body.categoryId
        })
        await data.save()
        res.json({ "msg": "Subcategory added" })
    } catch (err) { /* error handling */ }
}

let getCategories = async(req, res) => {
    try {
        let data = await Category.find().populate('subcategories')
        res.json(data)
    } catch (err) { /* error handling */ }
}

module.exports = { addCategory, addSubcategory, getCategories }