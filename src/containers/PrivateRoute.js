
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { setAuthToken } from '../AxiosFunctions/setCommonHeader';
 
const PrivateRoute = ({ component: Component, ...rest }) => {
 
   function hasJWT() {
       let flag = false;
 
       //check user has JWT token
       localStorage.getItem("authorization") ? flag=true : flag=false
       if(flag){
        setAuthToken(localStorage.getItem("authorization"))
       }
       return flag
   }
 
   return (
       <Route {...rest}
           render={props => (
               hasJWT() ?
                   <Component {...props} />
                   :
                   <Redirect to={{ pathname: '/admin/signin' }} />
           )}
       />
   );
};
 
export default PrivateRoute;