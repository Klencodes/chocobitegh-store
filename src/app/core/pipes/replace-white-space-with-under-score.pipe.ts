import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceWhiteSpaceWithUnderScore'
})
export class ReplaceWhiteSpaceWithUnderScorePipe implements PipeTransform {

  transform(text: string, ...args: any[]): any {
    if (text !== undefined && text !== null && text !== '') { return text.replace(/\s/g, '_'); }
    return '_';
  }

}