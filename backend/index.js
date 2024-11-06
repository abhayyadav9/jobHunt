import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./database/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js"

// Initialize environment variables
dotenv.config();

const app = express();

// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Enable CORS for the frontend (adjust the origin URL if needed)
// app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173", credentials: true }));
app.use(cors({
  origin: true, // Allows all origins
  credentials: true // Allows cookies and credentials to be sent
}));


// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);




// Start the server and connect to the database
const PORT = process.env.PORT || 5000; // Default to 5000 if PORT is undefined
app.listen(PORT, () => {
  connectDb(); // Ensure database connection
  console.log(`Server is running at port ${PORT}`);
});
