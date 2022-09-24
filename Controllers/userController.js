import userModel from "../Models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

// get a user 
export const getUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await userModel.findOne({ id: userId });
        if (user) {
            const { password, ...otherDetails } = user._doc;
            res.status(200).json(otherDetails);
        } else {
            res.status(200).send("No such user exists");
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getUsetbyUsername = async (req, res) => {
    const username = req.params.username;
    try {
        const user = await userModel.findOne({ username: username });
        if (user) {
            const { password, ...otherDetails } = user._doc;
            res.status(200).json(otherDetails);
        } else {
            res.status(200).json("Please Enter Correct UserName");
        }
    } catch (error) {
        res.status(500).json(error);
    }


}

export const getAlluser = async (req, res) => {
    const id = req.params.id;
    const user = await userModel.findById(id);
    if (user) {
        try {
            let users = await userModel.find();
            users = users.map((user) => {
                const { password, isAdmin, timestamps, ...otherDetails } = user._doc;
                return otherDetails;
            })
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(400).json("Access Denied");
    }

}

export const getAllFollowers = async (req, res) => {
    const id = req.params.id;
    const user = await userModel.findById(id);
    if (user) {
        try {
            let followers = await userModel.find({ following: id });
            res.status(200).send(followers);
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(400).json("Access Denied");
    }
}

export const getAllFollowing = async (req, res) => {
    const id = req.params.id;
    const user = await userModel.findById(id);
    if (user) {
        try {
            let following = await userModel.find({ followers: id });
            res.status(200).send(following);
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(400).json("Access Denied");
    }
}

export const updateUser = async (req, res) => {
    const userId = req.params.id;
    const { _id, isAdmin, password } = req.body;

    if (userId == _id || isAdmin) {
        try {
            if (password) {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(password, salt);
            }

            const user = await userModel.findByIdAndUpdate(userId, req.body, {
                new: true,
            });
            const token = jwt.sign(
                { username: user.username, id: user._id },
                '-->MYSOCI@LMEDI@@PP-->', { expiresIn: '12h' }
            )
            res.status(200).json({ user, token });
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json("Access Denied! you can only update your own profile");
    }

}

// Delete User
export const deleteUser = async (req, res) => {
    const userId = req.params.id;
    const { currentUserId, currentUserAdminStatus } = req.body;
    if (currentUserId === userId || currentUserAdminStatus) {
        try {
            await userModel.findByIdAndDelete(userId);
            res.status(200).json("User deleted successfully");
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json("Access Denied! you can only delete your own profile");
    }

}

export const followUser = async (req, res) => {
    const id = req.params.id;
    const currentUserId = req.body._id;

    if (currentUserId === id) {
        res.status(403).json("Action forbidden");
    } else {
        try {
            const followUser = await userModel.findById(id);
            const followingUser = await userModel.findById(currentUserId);

            if (!followUser.followers.includes(currentUserId)) {
                await followUser.updateOne({ $push: { followers: currentUserId } });
                await followingUser.updateOne({ $push: { following: id } });
                res.status(200).json("User followed!");
            } else {
                res.status(403).json("User is Already followed by you");
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
}


export const unfollowUser = async (req, res) => {
    const id = req.params.id;
    const currentUserId = req.body._id;

    if (currentUserId === id) {
        res.status(403).json("Action forbidden");
    } else {
        try {
            const followUser = await userModel.findById(id);
            const followingUser = await userModel.findById(currentUserId);

            if (followUser.followers.includes(currentUserId)) {
                await followUser.updateOne({ $pull: { followers: currentUserId } });
                await followingUser.updateOne({ $pull: { following: id } });
                res.status(200).json("User Unfollowed!");
            } else {
                res.status(403).json("User is not followed by you");
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
};
