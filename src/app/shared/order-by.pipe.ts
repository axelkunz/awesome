import { Pipe, PipeTransform } from "@angular/core";
import * as _ from "lodash";

@Pipe({
  name: "orderBy"
})
export class OrderByPipe implements PipeTransform {

    transform(value: any[], arg1: any, arg2: any): any[] {
        const property = arg1;
        const order = arg2 || "asc";

        // return _.orderBy(value, [user => user[property].toLowerCase()], [order]);
        return _.orderBy(value, property, [order]);
    }

}
