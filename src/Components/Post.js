import React,{Component} from 'react';
import {Card, Image,Button, TextArea, Form, Label, Comment, Modal} from 'semantic-ui-react';
import '../App.css';
import * as firebase from 'firebase';
import Comentario from './Comentario';

class Post extends Component {

  state={
    avatar: require('../Assets/Logo.png'),
    likes: 0,
    comment: "",
    comentarios: [],
    numCom: 0,
    commentModal:false,
    likedBool: false,
    likedButton: "black",

    commentAvatar:  "https://firebasestorage.googleapis.com/v0/b/catpics-d106c.appspot.com/o/Logo.png?alt=media&token=56e25256-af35-4e34-ac36-4b620559dbb9"

  }


  componentWillMount(){

    var refCom = firebase.database().ref(`users/${this.props.usuario.displayName}/profileUrl`);

    refCom.on('value',s=>{
      if(s.val() !== ""){
        this.setState({commentAvatar: s.val()})
      }
    })

    var avatarRef = firebase.database().ref(`users/${this.props.pic.user}/profileUrl`);

    avatarRef.on('value',(snapshot) => {
      if(snapshot.val() !== ""){
        this.setState({avatar: snapshot.val()});
      }
    });

    var likesRef = firebase.database().ref(`posts/${this.props.pic.key}/likes`);

    likesRef.on('value', snapshot => {
      this.setState({
        likes: snapshot.val()
      })
    })

    var commentListRef = firebase.database().ref(`posts/${this.props.pic.key}/comments`);

    commentListRef.once('value', (snapshot) => {

    })
    .then(()=>{
        commentListRef.on('child_added', (snapshot)=>{
          this.setState({
            comentarios: this.state.comentarios.concat(snapshot.val()),
            numCom: this.state.numCom + 1,
          })
        })
    })

    var likedRef = firebase.database().ref(`posts/${this.props.pic.key}/usersliked/${this.props.usuario.displayName}`);

    likedRef.once('value',s=>{

      var likesOpRef = firebase.database().ref(`posts/${this.props.pic.key}`);
      if(s.child('name').val() !== null && s.child('boolean').val() === true ){
        this.setState({
          likedButton: "purple"
        })
      }else{
        this.setState({
          likedButton: "black"
        })
      }
    })
  }

  handleLike = () => {

    var likedRef = firebase.database().ref(`posts/${this.props.pic.key}/usersliked/${this.props.usuario.displayName}`);

    likedRef.once('value',s=>{
      if(s.child("name").val() === null){
        likedRef.set({
          name: this.props.usuario.displayName,
          boolean:true
        })
      }

      var likesOpRef = firebase.database().ref(`posts/${this.props.pic.key}`);
      if(s.child('boolean').val() === true){
        likesOpRef.update({likes: this.state.likes - 1});
        likedRef.child("boolean").set(false)
        firebase.database().ref(`users/${this.props.pic.user}`).once('value',snapshot=>{
          firebase.database().ref(`users/${this.props.pic.user}`).update({
            likes: snapshot.child('likes').val() - 1
          })
        })
        this.setState({
          likedButton: "black"
        })

      }else{
        likesOpRef.update({likes: this.state.likes + 1});
        likedRef.child("boolean").set(true)
        firebase.database().ref(`users/${this.props.pic.user}`).once('value',snapshot=>{
          firebase.database().ref(`users/${this.props.pic.user}`).update({
            likes: snapshot.child('likes').val() + 1
          })
        })
        this.setState({
          likedButton: "purple"
        })
      }
    })

  }


  handleComment = () =>{

    firebase.database().ref(`posts/${this.props.pic.key}/comments`).push().set({
      username: this.props.usuario.displayName,
      comment: this.state.comment,
      avatar: this.state.commentAvatar
    });


    this.setState({
      comment: ""
    });

  }

  handleModal = () =>{
    this.setState({
      commentModal: !this.state.commentModal
    })
  }


  ComentList = ()=>{
    return(
      <div >
        {
          this.state.comentarios.map((com, index)=>{
            return(
              <Comentario comentario={com} key={index} />
            )
          })
        }
      </div>
    )
  }

  render(){
    return(
      <div >
        <Modal open={this.state.commentModal} >
          <Modal.Header>
            Comments
            <Button icon='close' negative
              onClick={()=> {this.handleModal()}}
              style={{
                position:"absolute",
                right: 6,
                top: 8
              }}
            />
          </Modal.Header>
          <Modal.Content  style={{background:"#b3b3b3"}} >
            <div
              style={{
                overflow:"auto",
                height: "50vh"
              }}
            >
              {this.ComentList()}
            </div>
            <div className="CommentArea" >
              <Form
                style={{
                  margin: 5,
                }}
              >
                <TextArea
                  autoHeight
                  placeholder='Comment this post'
                  rows={1}
                  value={this.state.comment}
                  onChange={(e)=>{
                    this.setState({
                      comment: e.target.value
                    });
                  }}
                />
              </Form>
              <Button icon="send" style={{margin: "5px 5px 5px 0"}}
                onClick={()=>{this.handleComment()}}
              />
            </div>
          </Modal.Content>
        </Modal>

        <Card
          style={{
              width: "100%",
              backgroundColor:"rgba(128, 128, 128,0.4)",
              marginBottom: 20
          }}
        >
          <Card.Header style={{display:"flex", alignItems: "center"}}>
            <Image
              src={this.state.avatar}
              circular
              className="Avatar"
            />
            <h1 style={{display:"inline", margin: "auto 0"}} >{' '}{this.props.pic.user}</h1>
          </Card.Header>
          <Image
            style={{
                margin: 'auto'
            }}
            src= {this.props.pic.imgUrl}
          />
          <div
            style={{
                margin:5
            }}
          >
            <Button
              circular
              color={this.state.likedButton}
              icon='paw'
              onClick={() => { this.handleLike()}} />
            <Label pointing='left' color={this.state.likedButton} >{this.state.likes}</Label>
            <Button
              circular
              color='black'
              icon='comments'
              style={{margin:"0 0 0 5px"}}
              onClick={() => {this.handleModal()}} />
            <Label pointing='left' color="black" >{this.state.numCom}</Label>
          </div>


        </Card>
      </div>
    );
  }
}

export default Post;
