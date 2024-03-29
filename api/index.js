import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRoutes from "./routes/user.route.js"
import authRoutes from "./routes/auth.route.js"
import postRoutes from "./routes/post.route.js"
import cookieParser from "cookie-parser"

dotenv.config()
const app = express();
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO).then(() => {
    console.log("MongoDB is connected");
}).catch(e => {
    console.log(e)
})


app.listen(3000, () => {
    console.log("Server has started on port 3000");
})

// Dodaj tę linię, aby udostępnić folder `assets` jako statyczny
app.use('/api/assets', express.static('api/assets'));

app.use("/api/user", userRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/post", postRoutes)
app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error"
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})