const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/images", express.static("public/images"));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage });

let categories = [
    { id: "C3", name: "Dals & Pulses", image: "dal.jpg", status: "Active", sequence: 1 },
    { id: "C4", name: "Olives & Oils", image: "oil.jpg", status: "Inactive", sequence: 2 },
    { id: "C5", name: "Tea", image: "tea.jpg", status: "Inactive", sequence: 0 },
    { id: "C6", name: "Atta & Flours", image: "flour.jpg", status: "Inactive", sequence: 0 },
];

// Get Categories
app.get("/api/categories", (req, res) => {
    res.json(categories);
});

// Add Category
app.post("/api/categories", upload.single("image"), (req, res) => {
    const newCategory = {
        id: `C${categories.length + 3}`,
        name: req.body.name,
        image: req.file ? req.file.filename : "default.jpg",
        status: "Inactive",
        sequence: req.body.sequence,
    };
    categories.push(newCategory);
    res.json({ message: "Category added", category: newCategory });
});

// Delete Category
app.delete("/api/categories/:id", (req, res) => {
    categories = categories.filter((cat) => cat.id !== req.params.id);
    res.json({ message: "Category deleted" });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));