import {LoginData} from 'src/app/model/login-data'
import {RegisterData} from 'src/app/model/register-data'
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
 })
export class LoginService {
    urlLogin="http://108.160.133.232:4040/api/users/login";
    urlRegister="http://108.160.133.232:4040/api/users/register"
    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': "application/json",
        })
    }
    doLogin(loginData:LoginData) {
        return this.http.post(this.urlLogin,loginData,this.httpOptions);
    }
    doRegister(registerData:RegisterData) {
        return this.http.post(this.urlRegister,registerData,this.httpOptions);
    }

    constructor(private http: HttpClient){

    }
}
