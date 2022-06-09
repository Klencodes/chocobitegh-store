import { Injectable } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class UtilsService {

  constructor(
    private decimalPipe: DecimalPipe
  ) { }

  transformDecimal(num) {
    return this.decimalPipe.transform(num, '1.2-2');
  }
  /**
   * Remove space(s) from text
   * @param text text to trim
   */
  removeWhitespace(text: string) {
    if (text !== undefined && text !== null && text !== '') { return text.replace(/\s/g, ''); }
    return '';
  }
  /**
 * Replace space(s) from text with underscores
 * @param text text to trim
 */
  replaceWhitespaceWithUnderscore(text: string) {
    if (text !== undefined && text !== null && text !== '') { return text.replace(/\s/g, '_'); }
    return '';
  }
  /**
* Replace space(s) from text with underscores
* @param text text to trim
*/
  replaceUnderscoreWithWhitespace(text: string) {
    if (text !== undefined && text !== null && text !== '') { return text.replace(/_/g, ' '); }
    return '';
  }

  /**
   * Convert data to formdata
   * @param formValue 
   * @returns 
   */
 toFormData<T>( formValue: T ) {
    const formData = new FormData();
  
    for ( const key of Object.keys(formValue) ) {
      const value = formValue[key];
      formData.append(key, value);
    }
  
    return formData;
  }

}