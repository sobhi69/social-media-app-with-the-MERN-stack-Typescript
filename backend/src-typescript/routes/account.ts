import express from 'express'
import {
    getAllAccounts,
    getAccountMidd,
    patchAccount,
    updateProfileImg,
    updateCover,
    toggleFollow,
    deleteAccount
} from '../controllars/account'
import upload from '../middleware/multer'

const router = express.Router()


router.get('/get-all', getAllAccounts)
router.put('/update-img/:id',upload.single('file'),updateProfileImg)
router.put('/update-cover/:id',upload.single('file'),updateCover)
router.put('/toggle-follow',toggleFollow)

router.route('/:id')
    .patch(getAccountMidd, patchAccount)
    .delete(deleteAccount)

export default router