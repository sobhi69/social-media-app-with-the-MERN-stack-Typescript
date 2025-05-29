export default interface SignUpForm {
    firstname:string,
    lastname:string,
    email:string,
    gender:'male' | 'female',
    password:string,
    confirmPassword:string
}