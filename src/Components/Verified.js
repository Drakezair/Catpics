import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {Grid, Segment, Button} from 'semantic-ui-react';
import '../CSS/Login.css';
import * as firebase from 'firebase';

class Verified extends Component{

  handleConfirm = setInterval(()=>{
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        if(user.emailVerified===true){
          alert("Your account has been verified");
          this.props.history.push("/timeline")
          clearInterval(this.handleConfirm);
        }
      }
    });
  }, 5000)

  render(){
      return(
          <Grid
            textAlign='center'
            className='Login-Container'
            verticalAlign='middle'
          >
            <Grid.Column className='Login-Inner'>
              <Segment vertical >
                <h1
                  style = {{
                    color: "#fff",
                    fontFamily: "Open Sans",
                    fontSize: "1em"
                  }}
                >
                  a verification link has been sent to your email account.
                </h1>
              </Segment>
            </Grid.Column>
          </Grid>
    );
  }
}

export default Verified;
