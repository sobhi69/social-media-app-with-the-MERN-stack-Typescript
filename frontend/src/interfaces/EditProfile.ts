export default interface EditProfile {
    firstname:string,
    lastname:string,
    worksAt:string,
    livesIn:string,
    relationshipStatus?:'single' | 'married' | '',
    country:string,
    gender:'male'|'female',
    profileImg?:File,
    coverImg?:File
}