import { AxiosInstance } from 'axios';
import _ from 'lodash';
const axios = require('axios').default;

const axiosInstance = axios.create({
  baseURL: 'https://dry-cliffs-99602.herokuapp.com/api',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': '*',
  }
});

const getAxiosInstance = (): AxiosInstance => {
  return axiosInstance
}

export const getSearchSuggestions = (userQuery: string): Promise<string[]> => {
  let results: string[];
  return axiosInstance({
    method: 'get',
    url: '/items',
    params: {
      q: userQuery,
    }
  }).
  then((response: any) => {
    debugger;
    return response.data;
  }).catch((e: object) => {
    return ['error'];
  });
};

