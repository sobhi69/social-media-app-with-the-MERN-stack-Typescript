import PostRecieved from "./PostRecieved";

export default interface AccountProfile {
    firstname: string,
    lastname: string,
    email: string,
    createdAt: string,
    gender:"male" | 'female', 
    updatedAt: string,
    _id: string,
    token: string,
    posts: string[],
    followers: string[],
    following: string[],
    worksAt?: string,
    livesIn?: string,
    country?: string,
    relationshipStatus?: 'single' | 'married',
    profileImg?: string,
    coverImg?: string,
}