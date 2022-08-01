require('dotenv').config({path:"./config.env"});

const express=require("express");
const connectDB=require("./config/db");
const errorHandler = require('./middleware/errorHandler');

  

connectDB();


const app=express();





app.use(express.json());   


app.use("/api/auth",require("./routes/auth"));

const PORT=process.env.PORT||7000;


const server=app.listen(PORT,()=>console.log(`server is listening to the port ${PORT}`));


app.use(errorHandler)


process.on("unhandledRejection",(err,promise)=>{
    console.log(`Logged error: ${err}`);
    server.close(()=>process.exit(1))
})



          