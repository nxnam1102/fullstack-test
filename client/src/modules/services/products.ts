import axios from 'axios';
import { SearchParams } from '../../interface';
import { getQuery } from '../helper';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:3005',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const ProductsService = {
  Get: async (data: SearchParams) => {
    let result: any = {};
    const queryString = getQuery(data);
    const path = `products${queryString}`;
    result = (await instance.get(path)).data;
    return result;
  },
  GetDetails: async (id: any) => {
    let result: any = {};
    try {
      const path = `products/${id}`;
      result = (await instance.get(path)).data?.[0];
      return result;
    } catch (error) {
      console.log('lỗi', error);
    } finally {
      return result;
    }
  },
};
