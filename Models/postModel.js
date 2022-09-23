import mongoose from "mongoose";

const postScheme = mongoose.Schema(
    {
        userId: {
            type: String,
            require: true
        },
        description: String,
        likes: [],
        image: String,
        username: String
    },
    {
        timestamps: true
    }
)

const postModel = mongoose.model("postModel", postScheme);

export default postModel;