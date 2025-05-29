import { NextFunction, Request, Response } from "express";
import AccountModel from '../model/account'
import NotificationModel from '../model/notification'

import EditAccount from "../interfaces/EditAccount";
import cloudinary from "../lib/cloudinary";
export const getAllAccounts = async (req: Request, res: Response) => {
    const allAccounts = await AccountModel.find()
    try {
        res.json(allAccounts)
    } catch (error: any) {
        console.error(`error in getAllAccounts`)
        res.status(500).json({ message: error.message })
    }
}

interface AccountRequest extends Request {
    account?: any
}

export const getAccountMidd = async (req: AccountRequest, res: Response, next: NextFunction) => {
    let account
    try {
        account = await AccountModel.findById(req.params.id)
        if (!account) {
            res.status(404).json({ message: `account with id: ${req.params.id} dosn't exist in DB` })
            return
        }
    } catch (error: any) {
        console.error(`error in getAccountMidd`)
        res.status(500).json({ message: error.message })
        return
    }

    req.account = account
    next()
}
export const patchAccount = async (req: AccountRequest, res: Response) => {
    const { country, firstname, lastname,
        livesIn,
        worksAt,
        gender,
        relationshipStatus }: EditAccount = req.body


    const account = req.account

    try {
        const updatedUser = await AccountModel.findByIdAndUpdate(account._id, {
            $set: {
                firstname,
                lastname,
                country,
                livesIn,
                worksAt,
                gender,
                relationshipStatus
            }
        }, { new: true })

        res.json(updatedUser)
    } catch (error: any) {
        console.error(`error in patchAccount`)
        res.status(500).json({ message: error.message })
    }

}


export const updateProfileImg = async (req: Request, res: Response) => {
    const accountId = req.params.id
    const file = req.file
    let secret
    if (file) {
        const cloudRes = await cloudinary.uploader.upload(file.path)
        secret = cloudRes.secure_url
    }

    try {
        const updatedAccount = await AccountModel.findByIdAndUpdate(accountId, { $set: { profileImg: secret } }, { new: true })
        res.json(updatedAccount)
    } catch (error: any) {
        console.error(`error in updateProfileImg`)
        res.status(500).json({ message: error.message })
    }
}

export const updateCover = async (req: Request, res: Response) => {
    const accountId = req.params.id
    const file = req.file
    let secret
    if (file) {
        const cloudRes = await cloudinary.uploader.upload(file.path)
        secret = cloudRes.secure_url
    }

    try {
        const updatedAccount = await AccountModel.findByIdAndUpdate(accountId,
            { $set: { coverImg: secret } },
            { new: true }
        )
        res.json(updatedAccount)
    } catch (error: any) {
        console.error(`error in updateProfileImg`)
        res.status(500).json({ message: error.message })
    }
}

// follow/id

interface FollowData {
    curId: string,
    targetId: string,
    curFollowingArr: string[],
    targetFollowersArr: string[],
    noteType: "newFollwer" | "unfollow"
}

export const toggleFollow = async (req: Request, res: Response) => {
    const { curId, targetId, curFollowingArr, targetFollowersArr, noteType }: FollowData = req.body

    try {
        const curAccount = await AccountModel.findByIdAndUpdate(curId, { $set: { following: curFollowingArr } }, { new: true })
        const targetAccount = await AccountModel.findByIdAndUpdate(targetId, { $set: { followers: targetFollowersArr } }, { new: true })
        await NotificationModel.create({
            from: curId,
            to: targetId,
            toAcc: curAccount,
            fromAcc: targetAccount,
            seen: false,
            noteType: noteType
        })
        res.json(curAccount)
    } catch (error: any) {
        console.error(`error in toggleFollow`)
        res.status(500).json({ message: error.message })
    }
}

export const deleteAccount = async (req: Request, res: Response) => {
    const accountId = req.params.id

    try {
        await AccountModel.findByIdAndDelete(accountId)
        res.json({message:"deleted!"})
    } catch (error: any) {
        console.error(`error in deleteAccount`)
        res.status(500).json({ message: error.message })
    }
}