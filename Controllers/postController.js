import mongoose from 'mongoose';
import postModel from '../Models/postModel.js'
import userModel from '../Models/userModel.js';



export const createPost = async (req, res) => {
    const newPost = new postModel(req.body)
    try {
        await newPost.save();
        res.status(200).json(newPost);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

export const getPost = async (req, res) => {
    const id = req.params.id;
    try {
        const posts = await postModel.findById(id);
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

export const updatePost = async (req, res) => {
    const postId = req.params.id;
    const { userId } = req.body;
    try {
        const post = await postModel.findById(postId);
        if (post.userId === userId) {
            await post.updateOne({ $set: req.body });
            res.status(200).json("Post Updated");
        } else {
            res.status(403).json("Action forbidden");
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

// Delete a Post
export const deletePost = async (req, res) => {
    const id = req.params.id;
    const { userId } = req.body;

    try {
        const post = await postModel.findById(id);
        if (post.userId === userId) {
            await post.deleteOne();
            res.status(200).json("Post deleted successfully");
        } else {
            res.status(403).json("Action forbidden");
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

// like/dislike a post
export const likeunlikePost = async (req, res) => {
    const id = req.params.id;
    const { userId } = req.body;
    try {
        const post = await postModel.findById(id);
        if (!post.likes.includes(userId)) {
            await post.updateOne({ $push: { likes: userId } });
            res.status(200).json("Post liked");
        } else {
            await post.updateOne({ $pull: { likes: userId } });
            res.status(200).json('Post unlike');
        }
    } catch (error) {
        res.status(500).json(error.message);
    }

}

export const getTimeLinePosts = async (req, res) => {
    const userId = req.params.id;
    try {
        let currentUserPosts = await postModel.find({ userId: userId });
        const user = await userModel.findById(userId);

        const followingPosts = await userModel.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(userId),
                },
            },
            {
                $lookup: {
                    from: "postmodels",
                    localField: "following",
                    foreignField: "userId",
                    as: "followingPosts",
                },
            },
            {
                $project: {
                    followingPosts: 1,
                    _id: 0,
                },
            },
        ]);


        currentUserPosts = currentUserPosts.concat(...followingPosts[0].followingPosts).sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
        res.status(200).json(currentUserPosts)
    } catch (error) {
        res.status(500).json(error.message);
    }
}