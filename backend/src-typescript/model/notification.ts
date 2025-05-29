import mongoose , { InferSchemaType, Schema } from 'mongoose' 

const notificationSchema = new mongoose.Schema({
    noteType:{
        type:String,
        enum:['newFollower','unfollow'],
        trim:true
    },
    from:{
        type:Schema.Types.ObjectId,
        ref:"Account",
        required:true
    },
    to:{
        type:Schema.Types.ObjectId,
        ref:"Account",
        required:true
    },
    toAcc: {
        type:Object,
        required:true
    },
    fromAcc: {
        type:Object,
        required:true
    },
    seen:{
        type:Boolean,
        default:false
    }

},{timestamps:true})


type Notification = InferSchemaType<typeof notificationSchema>
export default mongoose.model<Notification>('Notification',notificationSchema)