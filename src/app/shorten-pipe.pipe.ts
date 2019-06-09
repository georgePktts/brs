import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenPipe'
})
export class ShortenPipePipe implements PipeTransform {

  transform(value: any, args?: any , args2?: any): any {
    if (args) { return value.substring (0, args) + '.'.repeat(args2); }
    return value.substring(0, 4) + '.'.repeat(args2);
  }

}
