import express from 'express'
import { createPost, getPost, updatePost, deletePost, likeunlikePost, getTimeLinePosts } from '../Controllers/postController.js';

const postRouter = express.Router();

postRouter.post('/', createPost);
postRouter.get('/:id', getPost)
postRouter.put('/:id', updatePost)
postRouter.delete('/:id', deletePost);
postRouter.put('/:id/like', likeunlikePost);
postRouter.put('/:id/unlike', likeunlikePost);
postRouter.get("/:id/timeline", getTimeLinePosts);

export default postRouter;