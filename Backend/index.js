import express, { urlencoded } from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import { connectDB } from './database/db.js';
import userRoute from './routes/userRoutes.js';
import postRoute from './routes/post.route.js';
import messageRoute from './routes/message.route.js';
// import { fileURLToPath } from 'url';
import path from "path";

// Load environment variables before accessing them
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ES modules way to get __dirname
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));




const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
};

app.use(cors(corsOptions));

// Define routes
app.use('/api/v1/user', userRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/message", messageRoute);

app.get("/", (req, res) => {
    return res.send("Server started");
});

// Serve static files from the frontend's build directory
// app.use(express.static(path.join(__dirname, "/frontend/dist")));

// app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
// });

// Start the server and connect to the database
app.listen(PORT, () => {
    connectDB();
    console.log(`Server started on port ${PORT}`);
});
