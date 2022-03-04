import express from "express";
import { LeetcodeApi } from "./src/controllers/api.controller.js";

const app = express();
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Server Running 🔥🔥🔥🔥")
})

const api = new LeetcodeApi();
app.get("/profile/:username",api.getLeetCodeUserData)
app.get("/contestdetails/:username",api.getLeetCodeUserContestDetails)
app.listen(3000,()=>{

    console.log("started");
})