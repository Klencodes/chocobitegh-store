import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'priceDecimal',
})
export class PricePipe implements PipeTransform {
	transform(value: number, casasDecimais = 2) {
		return value.toFixed(casasDecimais).replace('.', '.')
	}
}
