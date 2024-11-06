import express from "express";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDb from "./database/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

// Initialize environment variables
dotenv.config();

const app = express();

// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Enable CORS for the frontend (adjust the origin URL if needed)
app.use(cors({
  origin: true, // Allows all origins
  credentials: true // Allows cookies and credentials to be sent
}));

app.get("/hello", (req, res) => {
  res.send("Hello world");
});

// Get the current directory using import.meta.url
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Serve static files from React frontend (if in production)
app.use(express.static(path.join(__dirname, "../frontend/build")));

// Catch-all route to serve index.html for all non-API routes
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
});

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
