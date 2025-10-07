import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connectDB } from './configs/db.js';
import userRouter from './routes/user.route.js';
import sellerRouter from './routes/seller.routes.js';
import connectCloudinary from './configs/cloudinary.js';
import productRouter from './routes/product.routes.js';
import cartRouter from './routes/cart.routes.js';
 

dotenv.config();

//create express app
const app = express();
const PORT = process.env.PORT || 3500;

await connectDB();
await connectCloudinary();

// Allow multiple arigins
const allowedOrigins = ["http://localhost:5173"];

// Middleware configuration
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigins, credentials: true}));
app.use('/api/product', productRouter);

// Send a response to the browser
app.get("/", (req, res) => res.send(`We are live😂😂`));
app.use("/api/user", userRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/cart', cartRouter);

// Listen to the PORT
app.listen(PORT, () => {
    console.log(`Server has started on http://localhost:${PORT}`);
});