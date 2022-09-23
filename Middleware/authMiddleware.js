import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();
const secret = process.env.JWT_SCREATE_KEY
const authMiddleWare = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (token) {
            const decoded = jwt.verify(token, secret);
            req.body._id = decoded?.id;
        }
        next();
    } catch (error) {
        res.status(403).send('access denied');
    }
}

export default authMiddleWare;