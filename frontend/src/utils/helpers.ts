export const matchsTwoStrings = (string1:string,string2:string) => {
    if (string1.toLocaleLowerCase().trim().includes(string2.toLocaleLowerCase().trim())) {
        return true 
    } else {
        return false
    }
}