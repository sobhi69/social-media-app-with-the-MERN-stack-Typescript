import express from 'express'
import { logOut, signIn, signUp } from '../controllars/auth'
const router = express.Router()

router.post('/sign-in',signIn)
router.post('/sign-up',signUp)
router.get('/log-out',logOut)



export default router