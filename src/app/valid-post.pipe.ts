import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "validPost"
})
export class ValidPostPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
    // return post.published || (!post.published && this.user.role === "admin");
  }

}
