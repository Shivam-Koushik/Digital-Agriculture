const express = require("express")
const mongoose = require("mongoose")
const bodyParse = require("body-parser")
const app = express()
const route = require("./routes/route")
require("dotenv").config()

app.use(bodyParse.json())

mongoose.connect(`mongodb+srv://ShivamKoushik:${process.env.cluster_Password}@cluster0.k1qkf.mongodb.net/${process.env.cluster_Name}?retryWrites=true&w=majority`, {
    useNewUrlParser: true
})
.then(()=> console.log("Shivam your DB is connected"))
.catch((error)=> console.log(error))

app.use("/",route)

let port = process.env.PORT
app.listen(port,()=>{
    console.log(`server is running on ${port}`)
})