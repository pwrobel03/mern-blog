import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

// const BASE_URL = process.env.BASE_URL || 'http://localhost:5173';
const postSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
            unique: true
        },
        image: {
            type: String,
            default: "https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post-1536x674.webp"
        },
        category: {
            type: String,
            default: "uncategorized"
        },
        slug: {
            type: String,
            required: true,
            unique: true
        }
    },
    {
        timestamps: true
    }
)

const Post = mongoose.model("Post", postSchema)
export default Post