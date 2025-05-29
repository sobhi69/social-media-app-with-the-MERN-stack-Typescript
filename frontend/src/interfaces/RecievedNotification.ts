import AccountProfile from "./AccountProfile";

export default interface RecievedNotification {
    noteType:'newFollower' | 'unfollow',
    toAcc:AccountProfile,
    fromAcc:AccountProfile,
    from:string,
    to:string
    seen:boolean,
    updatedAt:string,
    createdAt:string
}