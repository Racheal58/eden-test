import axios from 'axios';

export const http = axios.create({
  // attach api base url here
  baseURL: 'https://www.reddit.com/.json',
});
