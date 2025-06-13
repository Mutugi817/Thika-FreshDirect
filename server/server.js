import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connectDB } from './configs/db.js';
import userRouter from './routes/user.route.js';
 

dotenv.config();

//create express app
const app = express();
const PORT = process.env.PORT || 4000;

// Allow multiple arigins
const allowedOrigins = ["http://localhost:5173"];

// Middleware configuration
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigins, credentials: true}));

// Send a response to the browser
app.get("/", (req, res) => res.send(`We are live😂😂`));
app.use("/api/user", userRouter)

// Listen to the PORT
app.listen(PORT, () => {
    console.log(`Server has started on http://localhost:${PORT}`);
    connectDB();
});