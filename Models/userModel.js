import mongoose from "mongoose";

const userScheme = mongoose.Schema(
    {
        username: {
            type: String,
            require: true
        },
        password: {
            type: String,
            require: true
        },
        firstname: {
            type: String,
            require: true
        }, lastname: {
            type: String,
            require: true
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        profilePicture: String,
        coverPicture: String,
        about: String,
        livesIn: String,
        worksAt: String,
        relationship: String,
        country: String,
        followers: [],
        following: []
    },
    { timestamps: true }
)

const userModel = mongoose.model("userModel", userScheme);
export default userModel;