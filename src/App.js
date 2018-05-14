import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';


//Import Components area

import Login from './Components/Login';
import Register from './Components/Register';
import Forget from './Components/Forget';
import Timeline from './Components/Timeline';

// css
import 'semantic-ui-css/semantic.min.css';

class App extends Component {

  render() {
    return (
        <Router basename="/catpic/">
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path ="/register" component={Register} />
            <Route path ="/forget" component={Forget} />
            <Route path ="/timeline" component={Timeline} />
          </Switch>
        </Router>
        );
  }
}

export default App;
