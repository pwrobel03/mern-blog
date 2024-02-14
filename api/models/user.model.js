import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

const BASE_URL = process.env.BASE_URL || 'http://localhost:5173';
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        profilePicture: {
            type: String,
            default: () => `${BASE_URL}/api/assets/profile.png`
        }
    },
    {
        timestamps: true
    }
)

const User = mongoose.model("User", userSchema)
export default User