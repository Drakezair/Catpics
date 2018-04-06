import React,{PureComponent} from 'react';
import { Menu, Grid, Container,Image,Rail,Sticky, Button,Icon, Dimmer} from 'semantic-ui-react';

import logo from '../Assets/whiteLogo.png';

//COMPONENTES
import Post from './Post';

class Timeline extends PureComponent{

  state={
    contextRef:null,

  }

  DimShow= () => this.setState({active:true})
  DimHide= () => this.setState({active:false})

  handleContextRef = contextRef => this.setState({ contextRef })

  render(){
    const { contextRef, active } = this.state;
    const content = (
      <div>
        <Button icon="camera retro" size="massive" compact circular />
      </div>
    )


    return(
      <div ref={this.handleContextRef}>
        <Menu fixed='top'  style={{backgroundColor:'rgba(140, 0, 183,0.95)'}} >
          <Container>
            <Image src={logo} style={{height: 50, margin: 6}} />
            <h1 style={{marginBottom:'auto',marginTop:'auto', fontFamily:'Open sans', fontWeight:300, color:'#fff', fontSize:'1.4em'}} >CatPic's</h1>
          </Container>
        </Menu>

        <Container style={{marginTop: 70}} >
          <Grid columns={2} >
            <Grid.Row>

              <Grid.Column width={12} >
                <Post
                  author="Mar Zuckeberg"
                  image="https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/68dd54ca-60cf-4ef7-898b-26d7cbe48ec7/10-dithering-opt.jpg"
                  avatar="https://upload.wikimedia.org/wikipedia/commons/0/01/Mark_Zuckerberg_at_the_37th_G8_Summit_in_Deauville_018_square.jpg"
                />
                <Post
                  author="Mar Zuckeberg"
                  image="https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/68dd54ca-60cf-4ef7-898b-26d7cbe48ec7/10-dithering-opt.jpg"
                  avatar="https://upload.wikimedia.org/wikipedia/commons/0/01/Mark_Zuckerberg_at_the_37th_G8_Summit_in_Deauville_018_square.jpg"
                />
                <Post
                  author="Mar Zuckeberg"
                  image="https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/68dd54ca-60cf-4ef7-898b-26d7cbe48ec7/10-dithering-opt.jpg"
                  avatar="https://upload.wikimedia.org/wikipedia/commons/0/01/Mark_Zuckerberg_at_the_37th_G8_Summit_in_Deauville_018_square.jpg"
                />
                <Post
                  author="Mar Zuckeberg"
                  image="https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/68dd54ca-60cf-4ef7-898b-26d7cbe48ec7/10-dithering-opt.jpg"
                  avatar="https://upload.wikimedia.org/wikipedia/commons/0/01/Mark_Zuckerberg_at_the_37th_G8_Summit_in_Deauville_018_square.jpg"
                />
                <Post
                  author="Mar Zuckeberg"
                  image="https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/68dd54ca-60cf-4ef7-898b-26d7cbe48ec7/10-dithering-opt.jpg"
                  avatar="https://upload.wikimedia.org/wikipedia/commons/0/01/Mark_Zuckerberg_at_the_37th_G8_Summit_in_Deauville_018_square.jpg"
                />
                <Post
                  author="Mar Zuckeberg"
                  image="https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/68dd54ca-60cf-4ef7-898b-26d7cbe48ec7/10-dithering-opt.jpg"
                  avatar="https://upload.wikimedia.org/wikipedia/commons/0/01/Mark_Zuckerberg_at_the_37th_G8_Summit_in_Deauville_018_square.jpg"
                />
                <Post
                  author="Mar Zuckeberg"
                  image="https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/68dd54ca-60cf-4ef7-898b-26d7cbe48ec7/10-dithering-opt.jpg"
                  avatar="https://upload.wikimedia.org/wikipedia/commons/0/01/Mark_Zuckerberg_at_the_37th_G8_Summit_in_Deauville_018_square.jpg"
                />
                <Post
                  author="Mar Zuckeberg"
                  image="https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/68dd54ca-60cf-4ef7-898b-26d7cbe48ec7/10-dithering-opt.jpg"
                  avatar="https://upload.wikimedia.org/wikipedia/commons/0/01/Mark_Zuckerberg_at_the_37th_G8_Summit_in_Deauville_018_square.jpg"
                />
              </Grid.Column>
              <Grid.Column textAlign="center" width={4} >
                <Rail position="center" >
                  <Sticky offset={70} context={contextRef}>
                    <Dimmer.Dimmable
                      as={Image}
                      blurring
                      circular
                      dimmed={active}
                      dimmer={{active,content}}
                      onMouseEnter={this.DimShow}
                      onMouseLeave={this.DimHide}
                      size='small'
                      src='http://speakerbookingagency.com/wp-content/uploads/bb-plugin/cache/gates_print1-square.jpg'
                    />
                    <h1>Bill Gates</h1>
                    <Grid stretched columns={3}  >
                      <Grid.Column><strong>8</strong> posts</Grid.Column>
                      <Grid.Column><strong >999</strong> followed</Grid.Column>
                      <Grid.Column><strong>5k</strong> follows</Grid.Column>
                    </Grid>
                    <Button
                      as="button"
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

      </div>
        );
    }

}

export default Timeline;
