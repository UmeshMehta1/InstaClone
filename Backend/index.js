import express,{urlencoded} from "express"
import cors from 'cors'
import cookieParser from "cookie-parser"
import dotenv from 'dotenv'
import {connectDB} from './database/db.js'
import userRoute from './routes/userRoutes.js'
import postRoute from './routes/post.route.js'
import messageRoute from './routes/message.route.js'

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
app.use('/api/v1/user', userRoute)
app.use("/api/v1/post", postRoute);
app.use("/api/v1/message", messageRoute);

app.get("/",(req,res)=>{
   return res.send("server start")
})

app.listen(PORT,()=>{
    connectDB()
    console.log("server start 3000 port")
})