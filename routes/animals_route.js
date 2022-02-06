import { Router } from "express";

import { client } from "../server.js";

export const router = Router()



router.get("/", async (req, res) => {
    var animal = req.query.animal
    var details = ""
    if(animal) {
        animal = animal.toLowerCase()
        const data = await client.db("main").collection("animals").findOne({ name: animal })
        if (data) {
            details = data.desc
        }
    }
    res.render("animals/animal", { details, animal })
})


router.all("/add-animal", async (req, res) => {
    console.log("request method is", req.method)
    if (req.method == "POST") {
        console.log(req.body)
        if(!(req.body.animal && req.body.desc && req.body.lifespan)){
            res.status(402).send("bad input")
            return
        }
        const rps = await client.db("main").collection("animals").insertOne({ name: req.body.animal.toLowerCase(), desc: req.body.desc,lifespan:Number.parseInt(req.body.lifespan) })
        if (rps.acknowledged) res.render("message", { message: "your data was saved successfully" })
        else res.status(400).render("message", { message: "error occured" })
        // will store those in mongo 
    }
    else res.render("animals/add-animal")
})

router.all("/delete/:animal", async (req, res) => {
    console.log("req method is", req.method)
    if (req.method == "POST") {
        const rsp = await client.db("main").collection("animals").deleteOne({ name: req.params.animal })
        if (rsp.deletedCount > 0) res.render("message", { message: "Suucessfully deleted " + req.params.animal })
        else res.status(400).render("message",{message:"unable to delete"})
    }
    res.render("animals/delete", { animal: req.params.animal })
})
