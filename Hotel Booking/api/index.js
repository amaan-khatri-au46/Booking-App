import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"
import cookieParser from "cookie-parser";
import cors from "cors";


const app = express();
const PORT = 8000
// to use dot env we need to make sone configration 
dotenv.config()

// here we will set strict query so it will not throw any error in terminal 
mongoose.set('strictQuery', true);

const connect = async () => {
    try{
        await mongoose.connect(process.env.MONGO);
        console.log("Connected To Mongo Db")
    } catch(error){
        throw error;
    }
};

// middleware to parse a cookie one the user is authenticate
app.use(cookieParser())

// this middleware is used to pasrse the url for connecting backend server with th frontend .... 
app.use(cors())
// middleware to parse a json 
app.use(express.json())

// middleware after importing auth router
// here we had written auth and this will use auth from authRoute which we had import .....  
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);


// bascially this type of middle which is used to hit one after next middleware 
// and also it for error handling error ... 
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
    //   this stack will tell in more detail where the error came from .... 
      stack: err.stack,
    });
  });


app.listen(PORT , () => {
    connect()
    console.log("Server Started At Port " + PORT);
})