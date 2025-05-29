import mongoose, { InferSchemaType, Schema } from 'mongoose'

const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        required: true,
        trim: true
    },
    account: {
        type: Schema.Types.ObjectId,
        ref:"Account",
        required: true
    },
    photo: {
        type: String,
        default: undefined
    },
    video: {
        type: String,
        default: undefined
    },
    liked: {
        type: Boolean,
        default: false
    },
    shared: {
        type: Boolean,
        default: false
    },
    likes: {
        type: Array,
        default: []
    },
    commints: {
        type: Array,
        default: []
    }

}, { timestamps: true })


type Post = InferSchemaType<typeof postSchema>
export default mongoose.model<Post>('Post', postSchema)