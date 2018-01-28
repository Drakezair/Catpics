import React,{Component} from 'react';
import {Link} from "react-router-dom";
import { 
	Grid, Header, Card, Form, Button, Image 
} from 'semantic-ui-react';


import img from "../Assets/profile.png";

class Register extends Component{
	render(){
		return(
			<div className="register forms">
				
				<Grid padded centered>
					<Grid.Row>
					
						<Grid.Column textAlign="center" width={16}>
							<Header as="h1">
								Register
								<br/>
								<Image src={img} />
							</Header>
							<br/>
						</Grid.Column>

						<Grid.Column computer={5} tablet={8} mobile={14} textAlign="center">
							<Form size="big" className="formRegister">

								<Form.Input placeholder="Name" icon="user" iconPosition="left" />
								<Form.Input placeholder="Email" type="email" icon="mail" iconPosition="left" />
								<Form.Input placeholder="Password" type="password" icon="lock" iconPosition="left" />
								<Form.Input placeholder="Confirm Password" type="password" icon="lock" iconPosition="left" />

								<Button color="grey" className="btnForm">Register now</Button>
							</Form>
							<Header>
								if you have an account, click <Link to="/">here</Link>.
							</Header>
						</Grid.Column>

					</Grid.Row>

				</Grid>

			</div>
		);
	}
}

export default Register;
