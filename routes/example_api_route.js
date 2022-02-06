import { Router,json } from "express";
import { client } from "../server.js";

export const router = Router()

router.use(json())

router.get("/animals",async (req,res)=>{
    const data = await client.db("main").collection("animals")
    .find({lifespan:{$gt:Number.parseInt(req.query.lifespan)}})
    .project({"_id":0,"name":1,"lifespan":1}).toArray()
    res.json(data)
})

