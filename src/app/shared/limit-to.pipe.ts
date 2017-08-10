import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'limitTo'
})
export class LimitToPipe implements PipeTransform {

    transform(value: any[], arg1: number): any {
        const limit = arg1;
        let limitedValue = [];
        for (let i = 0; i < value.length; i++) {
            limitedValue.push(value[i]);
            if (i + 1 >= limit) {
                break;
            }
        }
        return limitedValue;
    }
}
