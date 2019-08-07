import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { LoginData } from 'src/app/model/login-data';
import {LoginService} from 'src/app/service/login-service'
import {RegisterData} from 'src/app/model/register-data'
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap'
@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  @Output() checkedChange = new EventEmitter();


  messageAlert:string="";
  public registerData: RegisterData={
    user:{
      fullname:"",
      username:"",
      email:"",
      password :""
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
  doRegister(event,content){
    event.preventDefault();
    let obs: any=this.loginService.doRegister(this.registerData);
    obs.subscribe((response: HttpResponse<Object>) => {
      console.log("response",response);
      var r : any = response;
      this.messageAlert="Succsessfuly!";
      this.modalService.open(content)
    }, (error: HttpErrorResponse) => {
      console.log(error);
      this.messageAlert="Something wrong!";
      this.modalService.open(content)
    })
    this.checkedChange.emit(true);
  }
}
