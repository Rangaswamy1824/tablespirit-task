import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./comp/Home";
import Login from "./comp/Login";
import Reg from "./comp/Reg";
import Logout from "./comp/Logout";
import Cart from "./comp/Cart";
import Updprod from "./comp/Updprod";
import Addprod from "./comp/Addprod";
import Nav from "./comp/Nav";
import "./App.css";
import Ct from "./comp/Ct";
import Km from "./comp/Km";
import Fpwd from "./comp/Fpwd";
import Dashboard from './comp/Dashboard'

const App = () => {
    let [usercon, setusercon] = useState({
        _id: "",
        name: "",
        token: "",
        role: "",
    });

    let updcont = (obj) => {
        setusercon({...usercon, ...obj });
    };

    let obj = { usercon: usercon, updcon: updcont };

    return ( <
        BrowserRouter >
        <
        Ct.Provider value = { obj } >
        <
        Nav / >
        <
        Routes >
        <
        Route path = "/"
        element = { < Home / > }
        /> <
        Route path = "/login"
        element = { < Login / > }
        /> <
        Route path = "/reg"
        element = { < Reg / > }
        /> <
        Route path = "/logout"
        element = { < Logout / > }
        /> <
        Route path = "/cart"
        element = { < Cart / > }
        /> <
        Route path = "/upd"
        element = { < Updprod / > }
        /> <
        Route path = "/addprod"
        element = { < Addprod / > }
        /> <
        Route path = "/km"
        element = { < Km / > }
        /> <
        Route path = "/fpwd"
        element = { < Fpwd / > }
        />  <
        Route path = '/dashboard'
        element = { < Dashboard / > }
        /> < /
        Routes > <
        /Ct.Provider> < /
        BrowserRouter >
    );
};

export default App;