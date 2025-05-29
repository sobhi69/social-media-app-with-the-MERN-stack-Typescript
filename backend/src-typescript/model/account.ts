import mongoose, { InferSchemaType, Schema } from 'mongoose'

const accountSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    gender: {
        type: String,
        required:true,
        enum: { message:"please provide the gender!", values: ['male', 'female'] }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        min: 6,
        required: true
    },
    token: {
        type: String,
        default: ""
    },
    posts: {
        type: Array,
        default: [],
    },
    followers: {
        type: [String],
        default: []
    },
    following: {
        type: [String],
        default: []
    },
    worksAt: {
        type: String,
        default: "",
        trim: true
    },
    country: {
        type: String,
        default: "",
        trim: true
    },
    livesIn: {
        type: String,
        default: "",
        trim: true
    },
    relationshipStatus: {
        type: String,
        default: "",
    },
    profileImg: {
        type: String,
        default: undefined
    },
    coverImg: {
        type: String,
        default: undefined
    }
}, { timestamps: true })

type Account = InferSchemaType<typeof accountSchema>

export default mongoose.model<Account>('Account', accountSchema)