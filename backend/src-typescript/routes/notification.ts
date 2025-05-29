import express from 'express'
import { myNotifications ,markNotesAsSeen, deleteMyNotifications} from '../controllars/notification'
const router = express.Router()


router.get('/my-notifications/:id',myNotifications)
router.delete('/delete-my-notifications/:id',deleteMyNotifications)
router.put('/mark-notes-as-seen/:id',markNotesAsSeen)


export default router