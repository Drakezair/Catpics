import React,{Component} from 'react';
import 'semantic-ui-css/semantic.min.css';
import '../CSS/Login.css';
import { Grid,Segment,Image,Form,Button } from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import * as firebase from 'firebase';

import profile from '../Assets/profile.png';


class Login extends Component{


  state={
    email: "",
    password: "",
    emErro: false,
    passError: false,
    loading: false
  }

    SignIn = () => {
      this.setState({loading: true});
      firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password)
      .then(()=>{
        this.props.history.push("/timeline");
      })
      .catch((error) => {
        var errorCode  = error.code;
        var errorMessage = error.message;

        this.setState({loading: false});

        if(errorCode === 'auth/invalid-email'){
          alert('Wrong email.');
          this.setState({email:"",emError: true})
        }

        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
          this.setState({password:"",passError: true})
        }


      });
    }

    render(){
        return(

            <Grid
              textAlign='center'
              className='Login-Container'
              verticalAlign='middle'
            >
              <Grid.Column computer={5} tablet={8} mobile={14} >
                <Image as='img' src={profile} className='Login-Profile' />
                <Form>
                  <Form.Input
                    icon='mail'
                    iconPosition='left'
                    placeholder="Email"
                    value={this.state.email}
                    type="email"
                    onChange={(event)=>{
                      this.setState({email:event.target.value});
                    }}
                  />
                  <Form.Input
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    value={this.state.password}
                    error={this.state.passError}
                    type="password"
                    onChange={(event)=>{
                      this.setState({password:event.target.value,passError:false});
                    }}
                  />
                  <Form.Group inline >
                    <Link style={{color:"white"}}  to='/register'>Register now</Link>
                    <Link style={{position:'absolute', right:0, color:"white"}} to='/forget'>forget?</Link>
                  </Form.Group>
                </Form>
                <Button
                  loading={this.state.loading}
                  content='Login'
                  onClick={this.SignIn}
                />
              </Grid.Column>

            </Grid>

        );
    }
}

export default Login;
