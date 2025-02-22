const umodel = require("../models/usermodel");
const cm = require("../models/cartmodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let adduser = async(req, res) => {
    try {
        let data = await umodel.findOne({ "_id": req.body._id }); // Fixed: Used findOne instead of findById
        if (data) {
            return res.status(400).json({ "msg": "Given email exists" });
        } else {
            let hash = await bcrypt.hash(req.body.pwd, 10);
            let user = new umodel({...req.body, "pwd": hash });
            await user.save();
            res.status(201).json({ "msg": "Registration successful" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ "msg": "Internal Server Error" });
    }
};

let login = async(req, res) => {
    try {
        let data = await umodel.findOne({ "_id": req.body._id }); // Fixed: Used findOne instead of findById
        if (!data) {
            return res.status(400).json({ "msg": "Invalid email" });
        }
        let isPasswordValid = await bcrypt.compare(req.body.pwd, data.pwd);
        if (!isPasswordValid) {
            return res.status(400).json({ "msg": "Incorrect password" });
        }

        let cartCount = await cm.aggregate([
            { $match: { "uid": req.body._id } },
            { $count: "nofitems" }
        ]);

        let nofitems = cartCount.length > 0 ? cartCount[0].nofitems : 0; // Fixed: Handle empty cart scenario

        let token = jwt.sign({ "_id": data._id }, "fsd4", { expiresIn: "2h" });

        res.status(200).json({
            "token": token,
            "_id": data._id,
            "name": data.name,
            "role": data.role,
            "nofitems": nofitems
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ "msg": "Internal Server Error" });
    }
};

let resetpwd = async(req, res) => {
    try {
        let data = await umodel.findOne({ "_id": req.body._id });
        if (!data) {
            return res.status(400).json({ "msg": "Invalid email" });
        }
        let hash = await bcrypt.hash(req.body.pwd, 10);
        await umodel.findByIdAndUpdate(req.body._id, { "pwd": hash });
        res.status(200).json({ "msg": "Password updated" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ "msg": "Internal Server Error" });
    }
};

module.exports = { adduser, login, resetpwd };