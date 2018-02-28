import React,{Component} from 'react';
import {Card, Image,Button} from 'semantic-ui-react';

class Post extends Component {


  render(){
    return(
      <div>
        <div>
          <Card
            style={{
              width: "100%",
              backgroundColor:"rgba(128, 128, 128,0.4)"
            }}
          >
            <Card.Header>
              <Image
                src={this.props.avatar}
                circular
                style={{
                  height:62,
                  width: 62,
                  float:"left",
                  margin: 5
                }}
              />
              <h1>{' '}{this.props.author}</h1>
            </Card.Header>
            <Image
              style={{
                margin: 'auto'
              }}
              src= {this.props.image}
            />
            <div
              style={{
                margin:5
              }}
            >
              <Button circular color='facebook' icon='facebook' />
              <Button circular color='twitter' icon='twitter' />
              <Button circular color='linkedin' icon='linkedin' />
              <Button circular color='google plus' icon='google plus' />
            </div>
          </Card>
        </div>
      </div>

    );
  }

}

export default Post;
