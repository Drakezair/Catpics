import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';


//Import Components area

import Login from './Components/Login';
import Register from './Components/Register';
import Forget from './Components/Forget';

// css
import 'semantic-ui-css/semantic.min.css';

class App extends Component {

  render() {
    return (
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path ="/register" component={Register} />
            <Route path ="/forget" component={Forget} />
          </Switch>
        </Router>
    );
  }
}

export default App;
