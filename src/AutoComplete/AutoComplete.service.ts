const axios = require('axios').default;

const axiosInstance = axios.create({
  baseURL: 'http://dry-cliffs-99602.herokuapp.com/api',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': '*',
  }
});

export const getSearchSuggestions = (userQuery: string): any => {
  const params = {
    q: userQuery,
  }

  let results: string[];
  console.log(Date.now() + 'happening laterrrr???');
  console.log('user query:' + userQuery);
  // return axiosInstance({
  //   method: 'get',
  //   url: '/items',
  //   params
  // }).
  // then((response: string[]) => {
  //   results = response;
  //   console.log('results', results);
  //   return results;
  // }).catch((e: object) => {
  //   return ['error'];
  // });
  return ['false', 'results']
};
