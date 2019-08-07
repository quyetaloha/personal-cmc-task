import { Component, OnInit, Input } from '@angular/core';
import { CourseService } from 'src/app/service/course-service'
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import {Course} from 'src/app/model/course'
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap'
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  @Input() userName: string;
  keySearch:string="";
  isSearch:boolean=false;
  tmpkeySearch:string="";
  listSourse:Course[];
  isCartShow:boolean=false;
  isHomeShow:boolean=true;
  isMapShow:boolean=false;
  isFormContactShow:boolean=false;
  email:string;
  cartItems:any[]=[
    
  ];
  messageAlert:string="";

  constructor(private courseService:CourseService,configBoot : NgbModalConfig,private modalService: NgbModal) {
    configBoot.backdrop = 'static';
    configBoot.keyboard = false;
   }

  open(content){
    this.modalService.open(content)
  }
  ngOnInit() {
    this.doGetCourseData();
    this.email=localStorage.getItem("email");
  }
  doGetCourseData(){
    this.cartItems=JSON.parse(localStorage.getItem("cartItems"));
    let tokenID=localStorage.getItem("tokenID");
    let tmplistSourse:Course[]=[];
    let obs: any=this.courseService.doGetSourseData(tokenID);
    obs.subscribe((response: HttpResponse<Object>) => {
      let data : any = response;
      console.log("response",response);
      data.data.forEach(function(element){
        let source:Course=new Course();
        source.subjectName=element.subjectName;
        source.description=element.description;
        source.image=element.URL;
        source.createdBy=element.createdBy
        source.id=element._id
        tmplistSourse.push(source);
      });
      this.listSourse=tmplistSourse;
      console.log("listSourse",this.listSourse);

    }, (error: HttpErrorResponse) => {
      console.log(error);
    })
  }
  dosearch(){
    this.keySearch=this.tmpkeySearch;
  }
  addToCart(event,id:string,content){
    event.preventDefault();
    let isnew:boolean=true;
    let tmpMessage="";
    if(this.cartItems.length<3){
      this.cartItems.forEach(function (value) {
        if(value.id===id){
          isnew=false;
          tmpMessage="khoa hoc da nam trong gio hang!";
          
        }
      }); 
      if(isnew){
        this.cartItems.push(this.getCourseById(id));
        tmpMessage="Đã thêm vào giỏ hàng!";
      }
      this.messageAlert=tmpMessage;
      this.modalService.open(content);
    }
    else{
      this.messageAlert="Không thể mua quá 3 khóa học";
      this.modalService.open(content);
    }
    
    localStorage.setItem("cartItems",JSON.stringify(this.cartItems));
    
    console.log("cart",this.cartItems);
  }
  getCourseById(id:string){
    let course:Course=null;
    this.listSourse.forEach((element)=>{
      if(element.id===id){
        course=element;
        return;
      }
    })
    return course;
  }
  showCart($event){
    event.preventDefault();
    this.isCartShow=true;
    this.isHomeShow=false;
    this.isFormContactShow=false;
    this.isMapShow=false;
  }
  showMap($event){
    event.preventDefault();
    this.isCartShow=false;
    this.isHomeShow=false;
    this.isFormContactShow=false;
    this.isMapShow=true;
  }
  showFormContact($event){
    event.preventDefault();
    this.isCartShow=false;
    this.isHomeShow=false;
    this.isFormContactShow=true;
    this.isMapShow=false;
  }
  showHome($event){
    event.preventDefault();
    this.isCartShow=false;
    this.isHomeShow=true;
    this.isFormContactShow=false;
    this.isMapShow=false;
  }
  removeItemFromCart(id:string){
    let tmpcartItems=this.cartItems;
    let cource:Course=this.getCourseById(id);
    tmpcartItems.forEach(function (value,index) {
      if(value.id===id){
        tmpcartItems.splice(index,1);
      }
    }); 
    this.cartItems=tmpcartItems;
    localStorage.setItem("cartItems",JSON.stringify(this.cartItems));
  }
}
