import jwt from 'jsonwebtoken'

export const generateToken = (userId:string) => {
    return jwt.sign({userId},process.env.TOKEN_SECRET || '12345',{
        expiresIn: "7d"
    })
}