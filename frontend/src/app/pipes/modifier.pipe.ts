import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'modifier'
})
export class ModifierPipe implements PipeTransform {
  transform(input: number) {
    return Math.floor((input - 10) / 2);
  }

}
