type Origin = string | undefined
type Cb = (err: Error | null, origin?: boolean) => void

const allowedOrigins = ['http://localhost:3070', "http://localhost:5173"]


export const corsOptions = {
    origin: (origin: Origin, cb: Cb) => {
        if (!origin || allowedOrigins.indexOf(origin) != -1) {
            cb(null, true)
        } else {
            cb(new Error('Error, not allowed from Cors'))
        }
    },
    optionsSuccessStatus: 200,
    credentials: true
}
