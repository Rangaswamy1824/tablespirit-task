import React, { useState } from "react";

const EditProduct = () => {
    const [category, setCategory] = useState("Motorola");
    const [subcategory, setSubcategory] = useState("Motorola 10");
    const [status, setStatus] = useState("Active");
    const [productName, setProductName] = useState("Motorola Edge");
    const [images, setImages] = useState([]);

    const categories = ["Motorola", "Realme"];
    const subcategories = { Motorola: ["Motorola 10", "Motorola 12"], Realme: ["Realme 10", "Realme 12"] };
    const statusOptions = ["Active", "Inactive"];

    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        const validFiles = files.filter((file) => file.size <= 10 * 1024 * 1024);
        setImages([...images, ...validFiles]);
    };

    return ( <
        div className = "edit-product-container" >
        <
        h2 > Edit Product < /h2> <
        div className = "form-group" >
        <
        label > Category < /label> <
        select value = { category }
        onChange = {
            (e) => setCategory(e.target.value) } > {
            categories.map((cat) => ( <
                option key = { cat }
                value = { cat } > { cat } < /option>
            ))
        } <
        /select> <
        /div>

        <
        div className = "form-group" >
        <
        label > Subcategory < /label> <
        select value = { subcategory }
        onChange = {
            (e) => setSubcategory(e.target.value) } > {
            subcategories[category].map((sub) => ( <
                option key = { sub }
                value = { sub } > { sub } < /option>
            ))
        } <
        /select> <
        /div>

        <
        div className = "form-group" >
        <
        label > Product Name < /label> <
        input type = "text"
        value = { productName }
        onChange = {
            (e) => setProductName(e.target.value) }
        /> <
        /div>

        <
        div className = "form-group" >
        <
        label > Status < /label> <
        select value = { status }
        onChange = {
            (e) => setStatus(e.target.value) } > {
            statusOptions.map((status) => ( <
                option key = { status }
                value = { status } > { status } < /option>
            ))
        } <
        /select> <
        /div>

        <
        div className = "form-group" >
        <
        label > Upload Image < /label> <
        input type = "file"
        accept = "image/*"
        multiple onChange = { handleImageUpload }
        /> <
        div className = "image-preview" > {
            images.map((image, index) => ( <
                img key = { index }
                src = { URL.createObjectURL(image) }
                alt = "preview"
                className = "preview-img" / >
            ))
        } <
        /div> <
        p > Upload Maximum allowed file size is 10 MB < /p> <
        /div>

        <
        div className = "button-group" >
        <
        button className = "cancel-btn" > Cancel < /button> <
        button className = "save-btn" > Save < /button> <
        /div> <
        /div>
    );
};

export default EditProduct;