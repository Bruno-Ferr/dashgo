import axios, { AxiosError } from 'axios';
import { parseCookies, setCookie } from "nookies";
import { signOut } from '../contexts/AuthContext';

let cookies = parseCookies()
let isRefreshing = false;
let failedRequestsQueue = [];

export const api = axios.create({
  // baseURL: 'http://localhost:3000/api'
  headers: {
    Authorization: `Bearer ${cookies['dashgo.token']}`
  }
});

api.interceptors.response.use(response => {
  return response;
}, (error: AxiosError) => {
  if(error.response.status === 401) {
    if(error.response.data?.code === 'token.expired') {
      cookies = parseCookies();
      
      const { 'dashgo.refreshToken': refreshToken } = cookies;
      const originalConfig = error.config

      if(!isRefreshing) {
        isRefreshing = true;

        api.post('http://localhost:3333/refresh', {
          refreshToken,
        }).then(response => {
          const { token } = response.data;
  
          setCookie(undefined, 'dashgo.token', token, {
            maxAge: 60 * 60 * 24 * 30,
            path: '/'
          })

          setCookie(undefined, 'dashgo.refreshToken', response.data.refreshToken, {
            maxAge: 60 * 60 * 24 * 30,
            path: '/'
          })
  
          api.defaults.headers['Authorization'] = `Bearer ${token}`;

          failedRequestsQueue.forEach(req => req.resolve(token))
          failedRequestsQueue = [];
        }).catch(error => {
          failedRequestsQueue.forEach(req => req.reject(error))
          failedRequestsQueue = [];
        }).finally(() => {
          isRefreshing = false;
        })
      }

      return new Promise((resolve, reject) => {
        failedRequestsQueue.push({
          resolve: (token: string) => {
            originalConfig.headers['Authorization'] = `Bearer ${token}`

            resolve(api(originalConfig))
          },
          reject: (err: AxiosError) => {
            reject(err)
          }})
      });
    } else {
      signOut()
    }
  }

  return Promise.reject(error)
})