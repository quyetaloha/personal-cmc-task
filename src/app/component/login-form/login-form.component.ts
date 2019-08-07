import { Component, OnInit } from '@angular/core';
import { LoginData } from 'src/app/model/login-data';
import {LoginService} from 'src/app/service/login-service'
import {RegisterData} from 'src/app/model/register-data'
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap'
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  public isLogin:boolean=true;
  messageAlert:string="";
  public loginData: LoginData={
      user:{
        email:"ahihi1@gmail.com",
        password :"12345678"
      }
  };
  constructor(private loginService:LoginService,
    private router:Router,
    configBoot : NgbModalConfig,
    private modalService: NgbModal) { 
      configBoot.backdrop = 'static';
      configBoot.keyboard = false;
    }
  ngOnInit() {
    
  }
  open(content){
    this.modalService.open(content)
  }
  doLogin(event,content){
    event.preventDefault();
    let email=this.loginData.user.email;
    let obs: any=this.loginService.doLogin(this.loginData);
    obs.subscribe((response: HttpResponse<Object>) => {
      console.log("response",response);
      var r : any = response;
      localStorage.setItem("tokenID",r.data.token);
      localStorage.setItem("email",email);
      console.log("data",JSON.stringify(r.data));
      this.router.navigate(["/home"]);

    }, (error: HttpErrorResponse) => {
      console.log(error);
      this.messageAlert="Account or password is incorrect!"
      this.modalService.open(content)
    })
  }
  laydata(value: boolean){
    this.isLogin=value;
  }
}
