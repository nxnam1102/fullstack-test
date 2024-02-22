import { SearchParams } from '../../interface';
import { toString } from 'lodash';

export const getQuery = (data: SearchParams) => {
  let queryString = '';
  for (let i = 0; i < Object.entries(data).length; i++) {
    let [key, value] = Object.entries(data)[i];
    if (i === 0) {
      queryString = queryString + '?';
    } else {
      queryString = queryString + '&';
    }
    if (value) {
      queryString = queryString + `${key}=${value}`;
    }
  }
  return queryString;
};

export const thousandFormat = (num: any) => {
  try {
    num = toString(num).replace(/,/g, '');
    var num_parts = num.toString().split('.');
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return num_parts.join('.');
  } catch {
    return '';
  }
};
