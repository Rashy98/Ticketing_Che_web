import React from 'react';
import {BrowserRouter as Router, Route,Switch} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/assets/css/topup.css';
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";

import TopUp from './Components/TopUp'
import PastJourneys from "./Components/PastJourneys";
import SignUp from './Components/SignUp';
import Login from './Components/login'
import PrivateRoute from "./Components/private-route/PrivateRoute";
import Dashboard from "./Components/Navbar";
// Check for token to keep user logged in
if (localStorage.jwtToken) {
    // Set auth token header auth
    const token = localStorage.jwtToken;
    setAuthToken(token);
    // Decode token and get user info and exp
    const decoded = jwt_decode(token);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));
// Check for expired token
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (decoded.exp < currentTime) {
        // Logout user
        store.dispatch(logoutUser());
        // Redirect to login
        window.location.href = "./login";
    }
}

function App() {
  return (
      <Provider store={store}>
           <Router>

                 <Route path="/SignUp" exact component={SignUp}/>
                 <Route path="/Login" exact component={Login}/>
                 <Switch>
                     <PrivateRoute exact path="/" component={TopUp} />
                     <PrivateRoute path="/History" exact component={PastJourneys}/>

                 </Switch>
           </Router>
      </Provider>
  );
}

export default App;
