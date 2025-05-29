export default interface EditAccount {
    firstname:string,
    lastname:string,
    worksAt:string,
    livesIn:string,
    relationshipStatus:'single' | 'married',
    country:string,
    gender:'male'|'female',
    profileImg:string,
    coverImg:string
}