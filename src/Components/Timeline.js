import React,{PureComponent} from 'react';
import * as firebase from "firebase";
import { Menu, Grid, Container,Image,Rail,Sticky, Button,Icon, Dimmer, Modal, Loader, Sidebar, Progress} from 'semantic-ui-react';
import '../CSS/Timeline.css';

import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

import logo from '../Assets/whiteLogo.png';

//COMPONENTES
import Post from './Post';

class Timeline extends PureComponent{

  state={
    contextRef:null,
    profileModal: false,
    uploadModal: false,

    imageCropUrl: "",
    imgToUpload:"",
    fileToUpload: null,


    username:"",
    profileImgUrl:require('../Assets/Logo.png'),

    loader: false,
    profileImgLoader: false,
    progressBar: "none",

    progress: 0,


    postList: [],
  }

  componentWillMount(){
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

        firebase.database().ref(`posts`).on('child_added',(snapshot)=>{
          this.setState({
            postList: this.state.postList.concat(snapshot.val())
          });
        })

      }else{
        //this.props.history.push("/");
      }
    })


  }

  handleProfileModal= ()=>{
    this.setState({profileModal: !this.state.profileModal})
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
        this.setState({profileImgLoader:true, active: true});
        firebase.storage().ref(user.displayName + "/Profile/").child("Profile.jpeg").putString(message,'data_url')
        firebase.storage().ref(user.displayName + "/Profile/Collections").child(date.toString() + ".jpeg").putString(message,'data_url')
        .then((snapshot)=> {
          this.setState({profileImgLoader:false, active: false});
        });

      firebase.storage().ref(user.displayName + "/Profile/Profile.jpeg").getDownloadURL()
      .then((url) => {
        firebase.database().ref(`users/${user.displayName}/${user.uid}`).child("profileImg").set("").then(()=>{
            firebase.database().ref(`users/${user.displayName}/${user.uid}`).update({profileImg:url})
        })
      });
    }
    });
  }

  handleUploadModal = () => {
      this.setState({uploadModal: !this.state.uploadModal});
  }

  handleUpload = () => {
    if (typeof this.cropper1.getCroppedCanvas() === 'undefined') {
      return;
    }
    this.setState({progressBar: "block"})
    var msg = this.cropper1.getCroppedCanvas().toDataURL("image/jpeg,0.5");
    var d = new Date();

    var ds
    firebase.auth().onAuthStateChanged((user)=>{
      firebase.storage().ref(`Posts/${this.state.fileToUpload}_${user.displayName}`).putString(msg,'data_url').on('state_changed', (snapshot)=>{
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        this.setState({progress: progress })

        if(progress === 100){
          setTimeout(()=>{
          this.setState({progressBar: "none",progress: 0})
          firebase.storage().ref(`Posts/${this.state.fileToUpload}_${user.displayName}`).getDownloadURL()
          .then((url)=>{

            firebase.database().ref('posts/').push().set({
              user: user.displayName,
              likes: 0,
              comments:"",
              imgUrl: url
            });
          });
          }, 1000);
        }
      })

    });
  }

//DIMMER
  DimShow= () => this.setState({active:true})
  DimHide= () => {
    if(this.state.profileImgLoader !== true){
      this.setState({active:false})
    }
  }

  handleContextRef = contextRef => this.setState({ contextRef });




  Posts = () => {
      return(
        <div>
          {
            this.state.postList.map(pic =>(
              <Post pic={pic} />
            )).reverse()
          }
        </div>
      )
  }

  render(){
    const { contextRef, active } = this.state;
    const content = (
      <div>
        <Button
          as = "label"
          icon
          size="massive"
          compact circular
          loading ={this.state.profileImgLoader}
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
              this.handleProfileModal();
            }}
          />
        </Button>
      </div>
    )


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
        />
      );
    }

    const Crop1 = (props)=>{
      return(
        <Cropper
          src={this.state.imgToUpload}
          viewMode={2}
          autoCropArea={0.5}
          dragMode="none"
          autoCropArea={1}
          style={{height: "400px"}}
          ref={cropper => { this.cropper1 = cropper; }}
        />
      );
    }

    return(
      <div ref={this.handleContextRef}>
        <Modal open={this.state.profileModal} >
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
              this.handleProfileModal()
            }}>Done</Button>
            <Button color="red" onClick={()=>{this.handleProfileModal()}} >Cancel</Button>
          </div>
        </Modal>

        <Modal  open={this.state.uploadModal} >
          <Modal.Content>
            <Crop1 />
          </Modal.Content>
          <div style={{display:"flex", padding: 10, justifyContent:"center"}}>
            <Button color="green" onClick={()=> {
              this.handleUpload();
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

                {this.Posts()}

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
                      as="label"
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
                      <input
                        type = "file"
                        accept = "image/*"
                        style={{display:'none'}}
                        onChange={(e) => {
                          e.preventDefault();

                          let reader = new FileReader();
                          let file = e.target.files[0];

                          reader.onloadend = () => {
                            this.setState({imgToUpload: reader.result,fileToUpload:file.name });
                          }

                          reader.readAsDataURL(file);
                          this.handleUploadModal();
                        }}
                      />
                    </Button>
                    <Progress
                      percent={this.state.progress}
                      indicating
                      style={{
                        display: this.state.progressBar
                      }}
                    />
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
