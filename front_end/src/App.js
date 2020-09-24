import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import TopUp from './Components/TopUp'
import PastJourneys from "./Components/PastJourneys";

function App() {
  return (
   <Router>
     <switch>
         <Route path="/" exact component={TopUp}/>
         <Route path="/History" exact component={PastJourneys}/>
     </switch>
   </Router>
  );
}

export default App;
