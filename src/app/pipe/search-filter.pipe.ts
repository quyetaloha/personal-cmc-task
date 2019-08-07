import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(value: any[], keySearch:string): any {
    if(keySearch===""){
      return value;
    }
    else{
      return value.filter((item, index) => {
        return item.subjectName.toLowerCase().includes(keySearch.toLowerCase());
      });
    }
  }

}
