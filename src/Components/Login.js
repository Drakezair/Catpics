import React,{Component} from 'react';
import 'semantic-ui-css/semantic.min.css';
import '../CSS/Login.css';
import { Grid,Segment,Image,Form,Button } from 'semantic-ui-react';
import {Link} from 'react-router-dom';

import profile from '../Assets/profile.png';


class Login extends Component{

    render(){
        return(

            <Grid
             textAlign='center'
             className='Login-Container'
             verticalAlign='middle'
            >

                <Grid.Column className='Login-Inner' >

                    <Segment   vertical >
                        <Image as='img' src={profile} className='Login-Profile' />
                        <Form>
                            <Form.Input
                             icon='at'
                             iconPosition='left'
                             placeholder="Username"
                            />
                            <Form.Input 
                             icon='lock'
                             iconPosition='left'
                             placeholder='Password'
                            />
                            <Form.Group inline >
                                <Link  to='/register'>Register now</Link>
                                <Link style={{position:'absolute', right:0}} to='/forget'>forget?</Link>
                            </Form.Group>

                        </Form>


                        <Button content='Login' />
                    </Segment>

                </Grid.Column>

            </Grid>

        );
    }
}

export default Login;