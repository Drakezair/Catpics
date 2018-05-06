import React,{PureComponent} from 'react';
import * as firebase from "firebase";
import { Menu, Grid, Container,Image,Rail,Sticky, Button,Icon, Dimmer, Modal, Loader, Segment} from 'semantic-ui-react';
import {Redirect} from 'react-router-dom'
import '../CSS/Timeline.css';

import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

import logo from '../Assets/whiteLogo.png';

//COMPONENTES
import Post from './Post';

class Timeline extends PureComponent{

  state={
    contextRef:null,
    uploadModal: false,

    imageCropUrl: "",
    imgProfileToUpload:null,


    username:"",
    profileImgUrl:require('../Assets/Logo.png'),

    loader: false
  }

  componentDidMount(){
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        if(user.emailVerified === false ){
          //this.props.history.push("/verified");
        }

        this.setState({username: user.displayName});

        firebase.storage().ref(user.displayName + "/Profile/Profile.jpeg").getDownloadURL()
        .then((url)=>{
          this.setState({profileImgUrl: url})
        })

      }else{
        //this.props.history.push("/");
      }
    })
  }

  handleUploadModal= ()=>{
    this.setState({uploadModal: !this.state.uploadModal})
  }


//PROFILE IMAGE PROCESS

  handleCrop = () => {
    if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
      return;
    }
    this.setState({profileImgUrl: this.cropper.getCroppedCanvas().toDataURL("image/jpeg",0.5)});

    var message = this.cropper.getCroppedCanvas().toDataURL("image/jpeg,0.5")


    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        var date = new Date();
        this.setState({loader:true});
        firebase.storage().ref(user.displayName + "/Profile/").child("Profile.jpeg").putString(message,'data_url')
        firebase.storage().ref(user.displayName + "/Profile/Collections").child(date.toString() + ".jpeg").putString(message,'data_url')
        .then((snapshot)=> {
          this.setState({loader:false});
        });
      }
    });
  }





//DIMMER
  DimShow= () => this.setState({active:true})
  DimHide= () => this.setState({active:false})

  handleContextRef = contextRef => this.setState({ contextRef });


  render(){
    const { contextRef, active } = this.state;
    const content = (
      <div>
        <Button
          as = "label"
          icon
          size="massive"
          compact circular
        >
          <Icon name="camera retro" />
          <input
            type="file"
            style={{display:"none"}}
            accept="image/*"
            onChange={(e)=>{
              e.preventDefault();

              let reader = new FileReader();
              let file = e.target.files[0];
              reader.onloadend = () => {
                this.setState({
                  imageCropUrl: reader.result
                });
              }
              reader.readAsDataURL(file);
              this.handleUploadModal();
            }}
          />
        </Button>
      </div>
    )

    function Posts(props){
        return(
          <Post
            author="Mar Zuckeberg"
            image="https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/68dd54ca-60cf-4ef7-898b-26d7cbe48ec7/10-dithering-opt.jpg"
            avatar="https://upload.wikimedia.org/wikipedia/commons/0/01/Mark_Zuckerberg_at_the_37th_G8_Summit_in_Deauville_018_square.jpg"
          />
        );
    }

    const Crop = (props)=>{
      return(
        <Cropper
          src={this.state.imageCropUrl}
          aspectRatio={1/1}
          viewMode={2}
          autoCropArea={0.5}
          dragMode="none"
          autoCropArea={1}
          style={{height: "400px"}}
          ref={cropper => { this.cropper = cropper; }}
          cropend={(e)=>{

          }}
        />
      );
    }

    return(
      <div ref={this.handleContextRef}>
        <Modal open={this.state.uploadModal} >
          <Modal.Header textAlign="center" >Crop your cat </Modal.Header>
          <Modal.Content image>
            <Modal.Description>
              <Modal.Header>
                <Crop />
              </Modal.Header>
            </Modal.Description>
          </Modal.Content>
          <div style={{display:"flex", padding: 10, justifyContent:"center"}}>
            <Button color="green" onClick={()=> {
              this.handleCrop();
              this.handleUploadModal()
            }}>Done</Button>
            <Button color="red" onClick={()=>{this.handleUploadModal()}} >Cancel</Button>
          </div>
        </Modal>
        <Menu fixed='top'  style={{backgroundColor:'rgba(140, 0, 183,0.95)'}} >
          <Container>
            <Image src={logo} style={{height: 50, margin: 6}} />
            <h1 style={{marginBottom:'auto',marginTop:'auto', fontFamily:'Open sans', fontWeight:300, color:'#fff', fontSize:'1.4em'}} >CatPic's</h1>
          </Container>
        </Menu>

        <Container style={{marginTop: 70}} >
          <Grid columns={2}  >
            <Grid.Row>

              <Grid.Column  computer={12} tablet={11} mobile={16} >
                <Posts />
              </Grid.Column>
              <Grid.Column textAlign="center" width={4}  >
                <Rail position="center" className="profile" >
                  <Sticky offset={70} context={contextRef} >

                    <Dimmer.Dimmable
                      as={Image}
                      blurring
                      circular
                      dimmed={active}
                      dimmer={{active,content}}
                      onMouseEnter={this.DimShow}
                      onMouseLeave={this.DimHide}

                      // src='http://speakerbookingagency.com/wp-content/uploads/bb-plugin/cache/gates_print1-square.jpg'
                      src={this.state.profileImgUrl}
                    />
                    <h1>{this.state.username}</h1>
                    <Grid stretched columns={2} >
                      <Grid.Column><strong>8</strong> posts</Grid.Column>
                      <Grid.Column><strong >999</strong> likes</Grid.Column>
                    </Grid>
                    <Button
                      //as="label"
                      icon
                      color="purple"
                      style={{
                          width:'95%',
                          margin:'15px',
                          borderRadius:12
                      }}
                    >
                      <Icon name='cloud upload' />
                      {'  '}Upload

                    </Button>
                  </Sticky>
                </Rail>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>

        <div
          style={{
            position: "fixed",
            bottom: 20,
            right: 20

          }}
        >
          <Loader active={this.state.loader} inline />
        </div>
      </div>
        );
    }

}

export default Timeline;
