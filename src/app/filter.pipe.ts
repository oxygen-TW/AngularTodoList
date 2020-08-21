import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
  //pure: false //使pipe可以接受非全新物件
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], cond: string): unknown {
    console.log(value, cond)
    if(cond === "all"){
      return value;
    }
    if(cond === "active"){
      return value.filter(x => !x.isCompleted);
    }
    if(cond === "completed"){
      return value.filter(x => x.isCompleted);
    }
    
  }

}
