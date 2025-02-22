import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Addprod = () => {
        const [msg, setMsg] = useState("");
        const [categories, setCategories] = useState([]);
        const [subcategories, setSubcategories] = useState([]);
        const [data, setData] = useState({
            name: "",
            cat: "",
            subcategory: "",
            price: "",
            desc: "",
            dct: "",
            pimg: null // Change to null for file input
        });

        let fileInputRef = useRef();
        let navigate = useNavigate(); // Remove this if navigation is not required

        // Fetch Categories
        useEffect(() => {
            axios.get("http://localhost:5000/categories")
                .then(res => setCategories(res.data))
                .catch(err => console.error("Error fetching categories:", err));
        }, []);

        // Load Subcategories based on Selected Category
        const loadSubcategories = (categoryId) => {
            setData({...data, cat: categoryId, subcategory: "" }); // Reset subcategory
            if (categoryId) {
                axios.get(`http://localhost:5000/subcategories/${categoryId}`)
                    .then(res => setSubcategories(res.data))
                    .catch(err => console.error("Error fetching subcategories:", err));
            } else {
                setSubcategories([]);
            }
        };

        // Handle Input Changes
        const handleChange = (e) => {
            setData({...data, [e.target.name]: e.target.value });
        };

        // Handle File Upload
        const handleFileChange = (e) => {
            setData({...data, pimg: e.target.files[0] });
        };

        // Add Product Function
        const addProduct = () => {
            let fd = new FormData();
            Object.keys(data).forEach(key => {
                fd.append(key, data[key]);
            });

            axios.post("http://localhost:5000/addprod", fd)
                .then(res => {
                    setMsg(res.data.msg);
                    setData({
                        name: "",
                        cat: "",
                        subcategory: "",
                        price: "",
                        desc: "",
                        dct: "",
                        pimg: null
                    });
                    fileInputRef.current.value = ""; // Reset file input

                    // Navigate after successful product addition (Optional)
                    navigate("/products"); // Change "/products" to your desired route
                })
                .catch(err => console.error("Error adding product:", err));
        };

        return ( <
            div className = "formcon" >
            <
            div className = "form" > {
                msg && < div className = "msg" > { msg } < /div>}

                <
                input
                type = "text"
                placeholder = "Enter product name"
                name = "name"
                value = { data.name }
                onChange = { handleChange }
                />

                <
                select name = "cat"
                value = { data.cat }
                onChange = {
                    (e) => loadSubcategories(e.target.value) } >
                <
                option value = "" > Select Category < /option> {
                    categories.map(cat => ( <
                        option key = { cat._id }
                        value = { cat._id } > { cat.name } < /option>
                    ))
                } <
                /select>

                <
                select
                name = "subcategory"
                value = { data.subcategory }
                onChange = { handleChange }
                disabled = {!subcategories.length } >
                <
                option value = "" > Select Subcategory < /option> {
                    subcategories.map(sub => ( <
                        option key = { sub._id }
                        value = { sub._id } > { sub.name } < /option>
                    ))
                } <
                /select>

                <
                input
                type = "text"
                placeholder = "Enter price"
                name = "price"
                value = { data.price }
                onChange = { handleChange }
                />

                <
                input
                type = "text"
                placeholder = "Enter description"
                name = "desc"
                value = { data.desc }
                onChange = { handleChange }
                />

                <
                input
                type = "text"
                placeholder = "Enter discount"
                name = "dct"
                value = { data.dct }
                onChange = { handleChange }
                />

                <
                input
                type = "file"
                name = "pimg"
                onChange = { handleFileChange }
                ref = { fileInputRef }
                />

                <
                button onClick = { addProduct } > Add Product < /button> <
                /div> <
                /div>
            );
        };

        export default Addprod;