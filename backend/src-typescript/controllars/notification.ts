import { Request, Response } from 'express'
import NotificationModel from '../model/notification'
export const myNotifications = async (req: Request, res: Response) => {
    const curId = req.params.id

    try {
        const notifications = await NotificationModel.find({ to: curId }).sort({'createdAt':'desc'})
        res.json(notifications)
    } catch (error: any) {
        console.error(`error in myNotifications ${error}`)
        res.status(500).json({ message: error.message })
    }
}
export const deleteMyNotifications = async (req: Request, res: Response) => {
    const curId = req.params.id

    try {
        await NotificationModel.deleteMany({ to: curId })
        res.json({message:"delete seccussfully"})
    } catch (error: any) {
        console.error(`error in myNotifications ${error}`)
        res.status(500).json({ message: error.message })
    }
}


export const markNotesAsSeen = async (req: Request, res: Response) => {
    const curId = req.params.id

    try {
        const notificationsIds = await NotificationModel.find({ to: curId },{_id:1})
        await NotificationModel.updateMany({_id:{$in:notificationsIds}},{$set:{seen:true}})
        res.json({message:"updated"})
    } catch(error: any) {
        console.error(`error in markNotesAsSeen ${error}`)
        res.status(500).json({ message: error.message })
    }

}