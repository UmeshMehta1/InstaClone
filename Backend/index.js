import express,{urlencoded} from "express"
import cors from 'cors'
import cookieParser from "cookie-parser"
import dotenv from 'dotenv'
import {connectDB} from './database/db.js'

const app = express()

const PORT=process.env.PORT

dotenv.config()
app.use(express.json())
app.use(cookieParser())
app.use(urlencoded({extended:true}));


const corsOptions={
    origin:"http://localhost:5173",
    credentials:true
}

app.use(cors(corsOptions))

app.get("/",(req,res)=>{
   return res.send("server start")
})

app.listen(PORT,(req, res)=>{
    connectDB()
    console.log("server start 3000 port")
})