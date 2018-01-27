import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';


//Import Components area

import Login from './Components/Login';
import Register from './Components/Register';

class App extends Component {

  render() {
    return (
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path ="/register" component={Register} />
          </Switch>
        </Router>
    );
  }
}

export default App;
