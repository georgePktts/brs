import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenText'
})
export class ShortenTextPipe implements PipeTransform {

  transform(value: string): any {
    if (value.length > 10 && value != null) {return value.substring(0 , 6)  + '...'; }
    return value;
  }

}
