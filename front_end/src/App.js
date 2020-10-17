import React from 'react';
import {BrowserRouter as Router, Route,Switch} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/assets/css/topup.css';
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";

import TopUp from './Components/Topup/TopUp'
import PastJourneys from "./Components/History/PastJourneys";
import SignUp from './Components/SignUp';
import Login from './Components/login'
import PrivateRoute from "./Components/private-route/PrivateRoute";

import Stat_Main from "./Components/Statistics/Stat_Main";
import Inspection_Stat from "./Components/Statistics/Inspection_Stat";
import Passenger_Stats from "./Components/Statistics/Passenger_Stats";
import Crowd_Stats from "./Components/Statistics/Crowd_Stats";
import Fare_Stat from "./Components/Statistics/Fare_Stat";
import All_Stat from "./Components/Statistics/AllStatistics";

import Dashboard from "./Components/Common/Navbar";
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
                     <PrivateRoute path="/Help" exact component={Stat_Main}/>
                     <PrivateRoute path="/ViewInspectors" exact component={Inspection_Stat}/>
                     <PrivateRoute path="/ViewFare" exact component={Fare_Stat}/>
                     <PrivateRoute path="/ViewCrowd" exact component={Crowd_Stats}/>
                     <PrivateRoute path="/ViewPassengers" exact component={Passenger_Stats}/>
                     <PrivateRoute path="/Statistics" exact component={All_Stat}/>

                 </Switch>
           </Router>
      </Provider>
  );
}

export default App;
