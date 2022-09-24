import userModel from "../Models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export const createUser = async (req, res) => {
    const { username, password, firstname, lastname } = req.body;
    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(password, salt);
    const newUser = new userModel({
        username,
        password: newPassword,
        firstname,
        lastname
    });
    try {
        const oldUser = await userModel.findOne({ username });
        if (oldUser) {
            return res.status(400).json({ message: "username not available" })
        }
        await newUser.save();
        const token = jwt.sign({
            username: username,
            id: newUser._id
        }, '-->MYSOCI@LMEDI@@PP-->', { expiresIn: '24h' })
        res.status(200).json({ user: newUser, token });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// login
export const LoginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await userModel.findOne({ username: username });
        if (user) {
            const userValidation = await bcrypt.compare(password, user.password);

            if (userValidation) {
                const token = jwt.sign({
                    username: username,
                    id: user._id
                }, '-->MYSOCI@LMEDI@@PP-->', { expiresIn: '24h' })
                res.header("Access-Control-Allow-Origin", "true");
                res.status(200).json(
                    { user, "token": token }
                );
            } else {
                res.status(400).json('Please Enter Correct Credentials');
            }
        } else {
            res.status(400).json('Please Enter Correct Credentials');
        }

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}