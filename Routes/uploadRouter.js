import express from 'express'
import multer from 'multer'
const uploadRouter = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, res, cb) => {
        cb(null, req.body.name);
    },
});

const upload = multer({ storage: storage })

uploadRouter.post('/', upload.single("file"), (req, res) => {
    try {
        return res.status(200).json("File Uploaded Successfully");
    } catch (error) {
        console.log(error);
    }
})

export default uploadRouter; 