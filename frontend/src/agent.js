import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'http://localhost:5000';

const encode = encodeURIComponent;
const responseBody = res => res.body;

const requests = {
   del: url =>
     superagent.del(`${API_ROOT}${url}`).catch(err => {}),
   get: url =>
     superagent.get(`${API_ROOT}${url}`).catch(err => {}),
   put: (url, body) =>
     superagent.put(`${API_ROOT}${url}`, body).catch(err => {}),
   post: (url, body) =>
     superagent.post(`${API_ROOT}${url}`, body).catch(err => {})
 };
 
 const Api = {
   login: (username, password) =>
     requests.post('/authenticate/'+username+'.'+password),
   register: (username, password) =>
      requests.post('/register/'+username+'.'+password),
   save_profile: profile =>
     requests.post('/profile', profile),
   get_profile: (quote_info) =>
     requests.get('/quote', quote_info),
   get_quote: () =>
     requests.get('/quote_history', { })
   };

export default {
   Api
   };