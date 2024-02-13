import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRoutes from "./routes/user.route.js"
import authRoutes from "./routes/auth.route.js"

dotenv.config()

mongoose.connect(process.env.MONGO).then(() => {
    console.log("MongoDB is connected");
}).catch(e => {
    console.log(e)
})
const app = express();
app.use(express.json());

app.listen(3000, () => {
    console.log("Server has started on port 3000");
})

app.use("/api/user", userRoutes)
app.use("/api/auth", authRoutes)
app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error"
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})