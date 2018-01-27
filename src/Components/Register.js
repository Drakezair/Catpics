import React,{Component} from 'react';
import { 
	Grid, Header, Card, Form, Button, Image 
} from 'semantic-ui-react';

import img from "../img/Icon.png";

class Register extends Component{
	render(){
		return(
			<div>
				
				<Grid padded centered className="register">
					<Grid.Row>
					
						<Grid.Column textAlign="center" width={16}>
							<Header as="h1">
								Register
								<br/>
								<Image src={img} />
							</Header>
							<br/>
						</Grid.Column>

						<Grid.Column computer={5} tablet={8} mobile={14}>
							<Form size="big" className="formRegister">

								<Form.Input placeholder="Name" icon="user" />
								<Form.Input placeholder="Email" type="email" icon="mail" />
								<Form.Input placeholder="Password" type="password" icon="lock" />
								<Form.Input placeholder="Confirm Password" type="password" icon="lock" />

								<Button color="grey" className="btnForm">Register now</Button>
							</Form>
						</Grid.Column>

					</Grid.Row>

				</Grid>

			</div>
		);
	}
}

export default Register;
