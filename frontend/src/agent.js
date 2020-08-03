import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'http://localhost:5000';

const encode = encodeURIComponent;
const responseBody = res => res.body;

const Username = null;

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
     requests.post('/authenticate/'+username+'.'+password).then(res => res),
   register: (username, password) =>
      requests.post('/register/'+username+'.'+password).then(res => res),
   save_profile: profile =>
     requests.post('/profile', profile).then(res => res),
   get_profile: profile =>
     requests.get('/profile').then(res => res),
   get_quote: async (quote_info) => {
       return await superagent
        .post('/quote')
        .send(quote_info)
        .set('accept','json')
    },
   get_quotes: () =>
    requests.get('/quote_history', { }).then(res => res),
   logout: () =>
     requests.post('/logout', {}).then(res => res)	   
   };

export default {
   Api,
   Username
   };