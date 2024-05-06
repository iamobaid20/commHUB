import path from "path";
import express from "express"; //package import
import dotenv from "dotenv";  //package import
import cookieParser from "cookie-parser";// this is to parse the cookie and give us the jwt token from the cookie

import authRoutes from "./routes/auth.routes.js"; //file import
import messageRoutes from "./routes/message.routes.js"; //file import
import userRoutes from "./routes/user.routes.js"; //file import

import connectToMongoDB from "./db/connectToMongoDB.js"; //file import
import { app, server } from "./socket/socket.js";
//const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

dotenv.config();

app.use(express.json()); //to parse the incoming requests with JSON payloadds (from req.body)
app.use(cookieParser()); // try to parse the cookie from incoming request

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/users",userRoutes);

 app.use(express.static(path.join(__dirname,"/frontend/dist")))

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

//app.get("/",(req,res)=>{res.send("WELCOME, obaid")});


server.listen(PORT, ()=> {
    connectToMongoDB();
    console.log(`server is running on port ${PORT}`);
}) 