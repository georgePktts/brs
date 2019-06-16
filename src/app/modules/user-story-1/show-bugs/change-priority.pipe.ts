import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'changePriority'
})
export class ChangePriorityPipe implements PipeTransform {

  transform(value: number): string {
    switch (value) {
      case 1: return 'Minor';
      case 2: return 'Major';
      case 3: return 'Critical';
      default: return 'Not Assigned';
    }
  }

}
