import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "commentDate"
})
export class CommentDatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    console.log(value);
    return null;
  }

}
