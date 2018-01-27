import React,{Component} from 'react';
import 'semantic-ui-css/semantic.min.css';
import '../CSS/Login.css';
import { Grid,Segment,Image,Form } from 'semantic-ui-react';

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
                        </Form>

                    </Segment>

                </Grid.Column>

            </Grid>

        );
    }
}

export default Login;