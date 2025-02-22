let express=require("express")
let mongoose=require("mongoose")
const route = require("./routes/route")
let cors=require("cors")

let app=express()
app.use(express.json())
app.use(cors())
app.use("/imgs",express.static("./prodimgs"))
mongoose.connect("mongodb://127.0.0.1:27017/fsd4ecom").then(()=>{
    console.log("ok")
})
app.use("/",route)
app.listen(5000)