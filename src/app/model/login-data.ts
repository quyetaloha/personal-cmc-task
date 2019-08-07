export class LoginData {
    user:{
        email?:string;
        password?:string;
    }
    constructor(
    ){
        this.user.email ="";
        this.user.password =""
    }
}
