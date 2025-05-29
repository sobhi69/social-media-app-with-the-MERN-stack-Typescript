import express from 'express'
import {
    createPost,
    getAllPosts,
    getPostMidd,
    deleteOnePost,
    toggleLike
} from '../controllars/post'
const router = express.Router()
import upload from '../middleware/multer'


router.post('/create-post', upload.single('file'), createPost)
router.get('/get-posts', getAllPosts)
router.post('/toggle-like', toggleLike)
router.delete('/delete-post', deleteOnePost)


export default router