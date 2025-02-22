// comp/Dashboard.js
import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import Ct from './Ct'

const Dashboard = () => {
    const [categories, setCategories] = useState([])
    const [newCat, setNewCat] = useState('')
    const [newSubcat, setNewSubcat] = useState({ name: '', category: '' })

    useEffect(() => {
        axios.get("http://localhost:5000/categories").then(res => {
            setCategories(res.data)
        })
    }, [])

    const addCategory = () => {
        axios.post("http://localhost:5000/addcategory", { name: newCat })
            .then(() => setNewCat(''))
    }

    const addSubcategory = () => {
        axios.post("http://localhost:5000/addsubcat", {
            name: newSubcat.name,
            categoryId: newSubcat.category
        }).then(() => setNewSubcat({ name: '', category: '' }))
    }

    return ( <
        div className = "dashboard" >
        <
        div className = "category-management" >
        <
        h2 > Category Management < /h2> <
        input value = { newCat }
        onChange = {
            (e) => setNewCat(e.target.value) }
        placeholder = "New category name" /
        >
        <
        button onClick = { addCategory } > Add Category < /button>

        <
        h3 > Add Subcategory < /h3> <
        select value = { newSubcat.category }
        onChange = {
            (e) => setNewSubcat({...newSubcat, category: e.target.value }) } >
        <
        option value = "" > Select Category < /option> {
            categories.map(cat => ( <
                option key = { cat._id }
                value = { cat._id } > { cat.name } < /option>
            ))
        } <
        /select> <
        input value = { newSubcat.name }
        onChange = {
            (e) => setNewSubcat({...newSubcat, name: e.target.value }) }
        placeholder = "Subcategory name" /
        >
        <
        button onClick = { addSubcategory } > Add Subcategory < /button> <
        /div>

        <
        div className = "product-management" > { /* Existing product management components */ } <
        /div> <
        /div>
    )
}

export default Dashboard