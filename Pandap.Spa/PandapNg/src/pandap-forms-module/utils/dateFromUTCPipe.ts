import { Pipe, PipeTransform } from '@angular/core';


@Pipe({ name: "DateFromUTCPipe" })
export class DateFromUTCPipe implements PipeTransform {
    transform(value: string) {
            return value.split("T")[0];
    }

}
