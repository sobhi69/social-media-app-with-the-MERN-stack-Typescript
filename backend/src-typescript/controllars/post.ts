import { NextFunction, Request, Response } from 'express'
import PostForm from '../interfaces/PostForm'
import cloudinary from '../lib/cloudinary'
import PostModel from '../model/post'
import AccountModel from '../model/account'

export const createPost = async (req: Request, res: Response) => {
    const { account, caption }: PostForm = req.body
    const file = req.file

    if (!caption || !account) {
        res.status(400).json({ message: "please provide caption and user id!" })
        return
    }
    let fileUrl
    if (file) {
        const cloudResponse = await cloudinary.uploader.upload(file.path)
        fileUrl = cloudResponse.secure_url
    }

    const newPost = await PostModel.create({
        caption,
        account,
        photo: file?.mimetype.startsWith('image') ? fileUrl : '',
        video: file?.mimetype.startsWith('video') ? fileUrl : ''
    })

    const updatedAccount = await AccountModel.findByIdAndUpdate(account, { $push: { posts: newPost._id } }, { new: true })

    try {
        res.status(201).json({ newPost, updatedAccount })
    } catch (error: any) {
        console.error(`error in register ${error}`)
        res.status(500).json({ message: error.message })
    }
}

export const getAllPosts = async (req: Request, res: Response) => {
    const allPosts = await PostModel.find()
    try {
        res.json(allPosts)
    } catch (error: any) {
        console.error(`error in getAllPosts`)
        res.status(500).json({ message: error.message })
    }
}

interface PostRequest extends Request {
    post?: any
}


export const getPostMidd = async (req: PostRequest, res: Response, next: NextFunction) => {
    let post
    try {
        post = await PostModel.findById(req.params.id)
        if (!post) {
            res.status(404).json({ message: `post with id: ${req.params.id} dosn't exist in DB` })
            return
        }
    } catch (error: any) {
        console.error(`error in getPostMidd`)
        res.status(500).json({ message: error.message })
        return
    }

    req.post = post
    next()
}

export const deleteOnePost = async (req: PostRequest, res: Response) => {
    const { postId, userId } = req.query

    try {
        const deletedPost = await PostModel.findByIdAndDelete(postId)
        const updatedAccount = await AccountModel.findByIdAndUpdate(userId, { $pull: { posts: deletedPost?._id }},{new:true})
        res.json(updatedAccount)
    } catch (error: any) {
        console.error(`error in deleteOnePost`)
        res.status(500).json({ message: error.message })
        return
    }
}

interface ToggleLikeData {
    postId: string,
    likesArr: string[]
}

export const toggleLike = async (req: Request, res: Response) => {
    const { postId, likesArr }: ToggleLikeData = req.body

    try {
        const updatedPost = await PostModel.findByIdAndUpdate(postId, { $set: { likes: likesArr } })
        res.json(updatedPost)
    } catch (error: any) {
        console.error(`error in deleteOnePost`)
        res.status(500).json({ message: error.message })
        return
    }
}
