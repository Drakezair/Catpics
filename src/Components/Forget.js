import React,{Component} from 'react';
import 'semantic-ui-css/semantic.min.css';
import '../CSS/Login.css';
import { Grid,Segment,Image,Form,Button } from 'semantic-ui-react';
import {BrowserRouter as Router,Switch,Route, Link,Redirect} from 'react-router-dom';
import * as firebase from 'firebase';

import profile from '../Assets/profile.png';

var email = "";

class Forget extends Component{


    render(){
        return(

            <Grid
              textAlign='center'
              className='Login-Container'
              verticalAlign='middle'
            >

              <Grid.Column computer={5} tablet={8} mobile={14} className='Login-Inner' >

                <Router basename="/forget" >
                  <Switch>
                    <Route exact path="/" component={Send} />
                    <Route path="/sended" >
                      <div>
                        <Sended />
                        <Button content="Next" onClick={()=>{this.props.history.push("/")}}/>
                      </div>
                    </Route>
                  </Switch>
                </Router>
              </Grid.Column>

            </Grid>

        );
    }
}

export class Send extends Component{

  state={
    loading: false,
    emails:""
  }

    render(){
        return(
            <div>
              <Image as='img' src={profile} className='Login-Profile' />
              <Form>
                <Form.Input
                  icon='mail'
                  type="email"
                  iconPosition='left'
                  placeholder="e-mail"
                  onChange={(e)=>{
                    email = e.target.value
                    this.setState({
                      emails: email
                    })
                  }}
                />
                <Button style={{margin:20}} content='Send' loading={this.state.loading}
                  onClick={()=>{
                    this.setState({
                      loading: true
                    })
                    console.log(this.state.emails);
                    firebase.auth().sendPasswordResetEmail(email)
                    .then(()=>{
                      this.props.history.push("/sended")
                    })
                    .catch((error)=>{
                      var erros = error.message
                      alert(erros);
                      this.setState({
                        loading: false
                      })
                    })
                  }}
                />
              </Form>
            </div>
        );
    }
}

export class Sended extends Component{

  state={
    email:""
  }

  componentWillMount(){
    this.setState({
      email: email
    })
  }

    render(){
        return(
            <div>
              <Image as='img' src={profile} className='Login-Profile' />
              <Form>
                <h1 style={{color:'#fff',}} >
                  We send you an email to {this.state.email} with a link to reset your password
                </h1>
              </Form>
            </div>
        );
    }
}

export default Forget;
