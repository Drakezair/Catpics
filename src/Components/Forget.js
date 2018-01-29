import React,{Component} from 'react';
import 'semantic-ui-css/semantic.min.css';
import '../CSS/Login.css';
import { Grid,Segment,Image,Form,Divider,Button, Header } from 'semantic-ui-react';
import {Link} from 'react-router-dom';

import profile from '../Assets/profile.png';


class Forget extends Component{

    render(){
        return(

            <Grid
             textAlign='center'
             className='Login-Container'
             verticalAlign='middle'
            >

                <Grid.Column className='Login-Inner' >

                    <Segment   vertical >
                        <Send />
                    </Segment>

                </Grid.Column>

            </Grid>

        );
    }
}

class Send extends Component{

    render(){
        return(
            <div>
                <Image as='img' src={profile} className='Login-Profile' />
                <Form>
                    <Form.Input
                     icon='mail'
                     iconPosition='left'
                     placeholder="e-mail"
                    />
                </Form>
                <Button style={{margin:20}} content='Send' />
                <Form>
                    <Link to='/' >Login with othe user</Link>
                </Form>
            </div>
        );
    }
}

class Sended extends Component{

    render(){
        return(
            <div>
                <Image as='img' src={profile} className='Login-Profile' />
                <Form>
                    <h1 style={{color:'#fff'}} >We send you an email to {'<e-mail>'}</h1>
                </Form>
            </div>
        );
    }
}

export default Forget;