import React,{PureComponent} from 'react';
import {Card, Image,Button, TextArea, Form, Label} from 'semantic-ui-react';
import '../App.css';

class Post extends PureComponent {


  render(){
    return(
      <div >
        <div>
          <Card
            style={{
              width: "100%",
              backgroundColor:"rgba(128, 128, 128,0.4)",
              marginBottom: 20
            }}
          >
            <Card.Header style={{display:"flex", alignItems: "center"}}>
              <Image
                src={require('../Assets/Logo.png')}
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
              <Button circular color='black' icon='paw' />
              <Label pointing='left' >{this.props.pic.likes}</Label>
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
                />
              </Form>
              <Button icon="send" style={{margin: "5px 5px 5px 0"}}/>
            </div>
          </Card>
        </div>
      </div>

    );
  }

}

export default Post;
