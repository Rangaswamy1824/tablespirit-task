const mongoose = require("mongoose");
const pm = require("./models/prodmodel"); // Import Product Model

mongoose.connect("mongodb://127.0.0.1:27017/fsd4ecom", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

const products = [{
        _id: "1",
        name: "Smartphone",
        cat: "Electronics",
        desc: "High-performance smartphone with 128GB storage",
        price: 49999,
        pimg: "/images/smartphone.jpg",
        dct: 10,
        reviews: []
    },
    {
        _id: "2",
        name: "Laptop",
        cat: "Electronics",
        desc: "Powerful laptop with Intel i7 processor",
        price: 74999,
        pimg: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
        dct: 15,
        reviews: []
    },
    {
        _id: "3",
        name: "Bluetooth Speaker",
        cat: "Accessories",
        desc: "Wireless speaker with deep bass",
        price: 2999,
        pimg: "https://images.unsplash.com/photo-1613252180840-7a9d3946d407",
        dct: 5,
        reviews: []
    },
    {
        _id: "4",
        name: "Gaming Headset",
        cat: "Accessories",
        desc: "Noise-canceling gaming headset with surround sound",
        price: 4999,
        pimg: "https://images.unsplash.com/photo-1605733512330-0890984c66cc",
        dct: 12,
        reviews: []
    },
    {
        _id: "5",
        name: "Smartwatch",
        cat: "Wearables",
        desc: "Fitness smartwatch with heart rate monitor",
        price: 8999,
        pimg: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
        dct: 8,
        reviews: []
    },
    {
        _id: "6",
        name: "Wireless Earbuds",
        cat: "Accessories",
        desc: "True wireless earbuds with noise cancellation",
        price: 5999,
        pimg: "https://images.unsplash.com/photo-1590658268037-6ee3cd49e8ee",
        dct: 10,
        reviews: []
    },
    {
        _id: "7",
        name: "4K Smart TV",
        cat: "Electronics",
        desc: "Ultra HD 4K smart TV with HDR support",
        price: 59999,
        pimg: "https://images.unsplash.com/photo-1598300186513-8a6f2a4722d2",
        dct: 20,
        reviews: []
    },
    {
        _id: "8",
        name: "Mechanical Keyboard",
        cat: "Accessories",
        desc: "RGB mechanical gaming keyboard",
        price: 4999,
        pimg: "https://images.unsplash.com/photo-1517331156700-3c241d2b4d83",
        dct: 15,
        reviews: []
    },
    {
        _id: "9",
        name: "DSLR Camera",
        cat: "Photography",
        desc: "Professional DSLR camera with 24MP sensor",
        price: 84999,
        pimg: "https://images.unsplash.com/photo-1526178613253-1b1c7f85dfc4",
        dct: 18,
        reviews: []
    },
    {
        _id: "10",
        name: "Portable Hard Drive",
        cat: "Storage",
        desc: "1TB external portable hard drive",
        price: 3999,
        pimg: "https://images.unsplash.com/photo-1557962413-1c134bbd0df6",
        dct: 7,
        reviews: []
    },
    {
        _id: "11",
        name: "Coffee Maker",
        cat: "Home Appliances",
        desc: "Automatic coffee maker with programmable settings",
        price: 7999,
        pimg: "https://images.unsplash.com/photo-1512568400610-62da28bc8a13",
        dct: 12,
        reviews: []
    },
    {
        _id: "12",
        name: "Air Purifier",
        cat: "Home Appliances",
        desc: "HEPA air purifier for clean indoor air",
        price: 12999,
        pimg: "https://images.unsplash.com/photo-1581090700227-1e37b190418e",
        dct: 10,
        reviews: []
    },
    {
        _id: "13",
        name: "Electric Scooter",
        cat: "Automotive",
        desc: "Eco-friendly electric scooter with long battery life",
        price: 39999,
        pimg: "https://images.unsplash.com/photo-1591295438874-91290c2685b0",
        dct: 25,
        reviews: []
    },
    {
        _id: "14",
        name: "Smart Home Speaker",
        cat: "Home Automation",
        desc: "Voice-controlled smart home speaker",
        price: 7999,
        pimg: "https://images.unsplash.com/photo-1535378620161-64927b8901f7",
        dct: 10,
        reviews: []
    },
    {
        _id: "15",
        name: "Fitness Treadmill",
        cat: "Fitness",
        desc: "Motorized treadmill with multiple workout modes",
        price: 34999,
        pimg: "https://images.unsplash.com/photo-1599058918144-d2ef7b530168",
        dct: 20,
        reviews: []
    }
];

export default products;

const addProducts = async() => {
    try {
        await pm.deleteMany(); // Clear existing products
        await pm.insertMany(products); // Insert new products
        console.log("Products added successfully!");
        mongoose.connection.close(); // Close DB connection
    } catch (err) {
        console.log("Error:", err);
    }
};

addProducts();