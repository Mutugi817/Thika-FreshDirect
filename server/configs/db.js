import mongoose from "mongoose";
//import dotenv from 'dotenv';
//dotenv.config();
export const connectDB = async () => {
	try {
        if(!process.env.MONGODB_URI) {
            return console.error("Please provide MONGODB_URI in the .env file");
        }
        mongoose.connection.on("Connected", () => console.log("Database connected"));
		const conn = await mongoose.connect(process.env.MONGODB_URI);
		console.log(`MongoDB connected: ${conn.connection.host}/ThikaFreshDirect`);
	} catch (error) {
		console.log("Error connecting to MONGODB", error.message);
		process.exit(1);
	}
};
