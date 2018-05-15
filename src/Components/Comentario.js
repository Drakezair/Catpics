import React,{Component} from 'react';
import {Card, Image,Button, TextArea, Form, Label, Comment, Modal} from 'semantic-ui-react';
import * as firebase from 'firebase';

class Comentario extends Component{

  state={
    avatar: "https://firebasestorage.googleapis.com/v0/b/catpics-d106c.appspot.com/o/Logo.png?alt=media&token=56e25256-af35-4e34-ac36-4b620559dbb9"
  }

  componentWillMount(){
    var ref = firebase.database().ref(`users/${this.props.comentario.username}`);


    ref.on('value',(s)=>{
      if(s.child("profileUrl").val() !== ""){
        this.setState({
          avatar: s.child("profileUrl").val()
        })
      }
    })
  }

  render(){
    return(
      <Comment.Group style={{margin: 5, maxWidth: "none"}} >
        <Comment>
          <Comment.Avatar src={this.state.avatar} />
          <Comment.Content
            style={{
              background:"#dfdcdc",
              padding: "0 5px",
              borderRadius: 5
            }}
          >
            <Comment.Author style={{color: "#3333f8", fontSize: "15px"}} >{this.props.comentario.username}</Comment.Author>
            <Comment.Text >
              {this.props.comentario.comment.split('\n').map((item, key) => {
                return <span key={key}>{item}<br/></span>
              })}
            </Comment.Text>
          </Comment.Content>
        </Comment>
      </Comment.Group>
    );
  }
}

export default Comentario;
