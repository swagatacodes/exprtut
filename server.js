import express from "express";
import { MongoClient } from "mongodb";
import { config as envconfig } from "dotenv";
import { router as animalsrouter } from "./routes/animals_route.js";
import { router as apirouter } from "./routes/example_api_route.js";

envconfig()

const app = express()

app.use(express.urlencoded({ extended: true })) //middleware

export const client = new MongoClient(process.env.MONGOURL)

await client.connect()
console.log("mongodb connected")


app.set("view engine", "pug")


//basic middleware example...

app.use((req,res,next)=>{
    
    // console.log("this is a basic middleware. added to the root level")
    // console.log("so when ever a request comes it will go through me and i can read/change data of the req and response")
    //if(req.query.password!="xyz123") res.status(400).send("youre junauthnticated")
    //else next()
    next()
})

// end of basic middleware...

app.get("/", (req, res) => {
    console.log(req.query)
    res.render("index", { names: ["vishal", "swagata"], surname: req.query.surname, name: req.query.name })
})

app.use("/animals",animalsrouter)
app.use("/api",apirouter)


app.listen(3000)