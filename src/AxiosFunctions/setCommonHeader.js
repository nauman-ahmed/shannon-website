
import axios from 'axios';
 
export const setAuthToken = token => {
   if (token) {
       axios.defaults.headers.common["authorization"] = `Basic ${token}`;
   }
   else
       delete axios.defaults.headers.common["authorization"];
}