// Import Libraries
import { HashRouter, Route, Switch } from "react-router-dom";
import 'react-image-crop/dist/ReactCrop.css'

// Import Resources
import SignInUp from "./containers/signInUp/signInUp";
import Artist from "./containers/artist/artist";
import Image_uploading from "./containers/artist/image_uploading";
import Admin from "./containers/admin/admin";
import Index from "./containers/clientSite";
import Page404 from "./containers/clientSite/404";
import PrivateRoute from "./containers/PrivateRoute";
import PrivateArtistRoute from "./containers/PrivateArtistRoute";
import { setAuthToken } from "./AxiosFunctions/setCommonHeader";
import Admin_update from "./containers/admin/Image_uploading";
import ForgetPassword from "./containers/signInUp/forgetPassword";
import { useEffect } from "react";



function App() {

  return ( 
  <>
    <HashRouter>
      <Switch>
 
      <Route
          exact
          path="/artist/signin"
          name="Artist Sign In"
          component={SignInUp}
        />
        <Route
          exact
          path="/artist/signup"
          name="Artist Sign up"
          component={SignInUp}
        />
        <Route
          exact
          path="/admin/signin"
          name="Admin Sign In"
          component={SignInUp}
        />
        <Route
          exact
          path="/forgetAdmin"
          name="Admin forget"
          component={ForgetPassword}
        />
         <Route
          exact
          path="/forgetArtist"
          name="Admin forget"
          component={ForgetPassword}
        />
        <PrivateArtistRoute
          exact
          path="/artist/"
          name="Artist"
          component={Artist}
        />
        
        <PrivateArtistRoute
          exact
          path="/artist/image_uploading"
          name="Artist Image Uploading"
          component={Image_uploading}
        />
        <PrivateRoute
          exact
          path="/admin/"
          name="Admin"
          component={Admin}
        />
        <PrivateRoute
          exact
          path="admin/artist/updateImage"
          name="Admin"
          component={Admin_update}
        />
        <PrivateRoute
          exact
          path="/admin/:pageName"
          name="Admin"
          component={Admin}
        />
        <PrivateRoute
          exact
          path="/admin/:pageName/:imageId"
          name="Admin"
          component={Admin}
        />
        
        <Route
            exact
            path="/"
            name="Home"
            // component={Index}
            render={(props) => 
              {
                if (props.match.params.pages !== "admin" || props.match.params.pages !== "artist") {
                  return <Index/>
                }
                else{
                  return <Page404/>
                }
                
              }}
          />
          <Route
            exact
            path="/:pages"
            name="Home"
            render={(props) => 
              {
                if (props.match.params.pages === "admin") {
                  return <Admin/>
                }
                else if (props.match.params.pages === "artist"){
                  return <Artist/>
                }
                else if (props.match.params.pages === "404"){
                  return <Page404/>
                }
                else if (!props.match.params.pages){
                  return <Artist/>
                }
                else{
                  return <Index/>
                }
          }}
          /> 
           <Route
            exact
            path="/:pages/:search"
            name="Home"
            render={(props) => 
              {
                if(props.match.params.search){
                  if (props.match.params.pages === "artists") {
                  return <Index/>
                  }else if (props.match.params.pages === "divisions" || props.match.params.pages === "categories" ){
                    return <Index/>
                  }
                  else{
                    return <Page404/>
                  }
                }
                else{
                  return <Page404/>
                }
          }}
          />
      </Switch>
    </HashRouter>
  </>
  );
}

export default App;
