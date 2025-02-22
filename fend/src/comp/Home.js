import axios from "axios"
import { useContext, useEffect, useState } from "react"
import Ct from "./Ct"
import { useNavigate } from "react-router-dom"


const Home = () => {
    let [prod,setprod]=useState([])
    let obj=useContext(Ct)
    let navigate=useNavigate()
    useEffect(()=>{
        axios.get("http://localhost:5000/getprod").then((res)=>{
            setprod(res.data)
        })

    },[])
    let addcart=(item)=>{
        let prodobj={"pid":item._id,"uid":obj.usercon._id,"qty":1,"pimg":item.pimg,"name":item.name,"cat":item.cat,"dct":item.dct,"price":item.price}
        axios.post("http://localhost:5000/addcart",prodobj).then(()=>{
            navigate("/cart")

        })
    }
    let km=(item)=>{
        obj.updcon({"prod":item})
        navigate("/km")
    }
  return (
    <div className="prodcon">
        {
            prod.map((item)=>{
                return(<div className="prod">
                    <div className="pimg">
                        <img src={`http://localhost:5000/imgs/${item.pimg}`}/>
                    </div>
                    <p>Name:{item.name}</p>
                    <p>Cat:{item.cat}</p>
                    <p>Price:{item.price}</p>
                    <p>Discount:{item.dct}</p>
                    <button onClick={()=>km(item)}>Know more...</button>
                { obj.usercon.token!=""&&   <button onClick={()=>addcart(item)}>Addcart</button>}
                  { obj.usercon.token!=""&&obj.usercon.role=="admin"&&<button>Edit</button>}
                  { obj.usercon.token!=""&&obj.usercon.role=="admin"&&   <button>Delete</button>}


                </div>)
            })
        }
    </div>
  )
}

export default Home