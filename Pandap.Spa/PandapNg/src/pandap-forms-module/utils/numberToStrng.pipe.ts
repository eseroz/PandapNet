import {Pipe,PipeTransform} from '@angular/core'

@Pipe ({name:"NumberToStringPipe"})
export class NumberToStringPipe implements PipeTransform
{
    transform(value: number) {
        return value.toString() + "oooooo";
    }

}