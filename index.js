import express from "express";
import path from 'path';
import { LeetcodeApi } from "./src/controllers/api.controller.js";
const __dirname = path.resolve();

const app = express();
app.use(express.json());

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname, '/views/index.html'));
    // res.send("Server Running 🔥🔥🔥🔥")
})
app.get("/contact",(req,res)=>{
    res.sendFile(path.join(__dirname, '/views/contact.html'));
})
app.get("/docs",(req,res)=>{
    res.sendFile(path.join(__dirname, '/views/documentation.html'));
})

const api = new LeetcodeApi();
app.get("/profile/:username",api.getLeetCodeUserData)
app.get("/contestdetails/:username",api.getLeetCodeUserContestDetails)
app.listen(3000,()=>{
    console.log("started");
})