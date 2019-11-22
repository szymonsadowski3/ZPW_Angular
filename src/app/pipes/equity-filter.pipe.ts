import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'equityfilter',
  pure: false
})
export class EquityFilterPipe implements PipeTransform {
  // transform(items, filterKey, filterValue) {
  transform(items, filterFunc) {
    if (!items || !filterFunc) {
      return items;
    }

    // return items.filter(item => item[filterKey] === filterValue);
    return items.filter(filterFunc);
  }
}
