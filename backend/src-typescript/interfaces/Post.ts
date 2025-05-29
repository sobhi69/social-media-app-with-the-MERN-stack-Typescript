export default interface Post {
    photo?:string,
    account:string,
    video?:File,
    caption:string,
    liked:boolean,
    shared:boolean,
    likes:string[],
    shares:string[],
    commints:string[]
}