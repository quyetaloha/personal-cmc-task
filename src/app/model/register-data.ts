export class RegisterData {
    user:{
        fullname?:string;
        username?:string;
        email?:string;
        password?:string;
    }
    constructor(
    ){
        this.user.fullname ="";
        this.user.username =""
        this.user.email ="";
        this.user.password =""
    }
}
