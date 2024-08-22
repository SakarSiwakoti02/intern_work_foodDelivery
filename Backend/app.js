const express = require("express")
const app = express()
const cors = require("cors")
require("dotenv").config()
const{multer, storage} = require("./Services/multerConfig");
// const upload = multer({storage:storage})


require("./Models/index")

const authRoute = require("./Routes/authRoutes")
const menuRoute = require("./Routes/menuRoutes")
const paymentRoute = require("./Routes/paymentRoute")

app.use(cors({
    origin : "http://localhost:5173",
    credentials: true
}))



app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static('uploads/'))
app.use("", authRoute);
app.use("/menu", menuRoute);
app.use("/payment", paymentRoute);
// server listening
app.listen (3000, () => {
    console.log("the project started in 3000 port")
})