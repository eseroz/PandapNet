import { Pipe, PipeTransform } from '@angular/core';


@Pipe({ name: "DateFromUTCPipe" })
export class DateFromUTCPipe implements PipeTransform {
  transform(value: string) {
    if (!value)
      return value;

    return value.split("T")[0];
  }

}
