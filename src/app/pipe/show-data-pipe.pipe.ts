import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'showDataPipe'
})
export class ShowDataPipePipe implements PipeTransform {

  transform(value: string, kindFilter:string): any {
    if(kindFilter==="subjectName"){
      if(value.length>50){
        return value.slice(0,50)+"..."
      }
      else return value;
    }
    else if(kindFilter==="description"){
      if(value.length>80){
        return value.slice(0,80)+"..."
      }
      else return value;
    }
  }

}
