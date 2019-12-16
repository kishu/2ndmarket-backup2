import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectURL'
})
export class ObjectURLPipe implements PipeTransform {

  transform(value: File, ...args: any[]): string {
    return URL.createObjectURL(value);
  }

}
