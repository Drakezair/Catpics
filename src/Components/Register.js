import React,{Component} from 'react';
import { 
	Grid, Header, Card, Form, Button 
} from 'semantic-ui-react';

class Register extends Component{
	render(){
		return(
			<div>
				
				<Grid padded centered>
					<Grid.Row>
					
					<Grid.Column textAlign="center" width={16}>
						<Header as="h1" >
							Register
						</Header>
					</Grid.Column>

					<br/>
					<br/>
					<br/>

					<Grid.Column width={5}>
						<Card fluid>
							<Card.Content>
								<Form>


									<Form.Input label="Name" icon="user" />
									<Form.Input label="Email" type="email" icon="mail" />
									<Form.Input label="Password" type="password" icon="lock" />
									<Form.Input label="Confirm Password" type="password" icon="lock" />
								
									<Button color="pink" fluid >register</Button>
								</Form>
							</Card.Content>
						</Card>
					</Grid.Column>
					</Grid.Row>

				</Grid>

			</div>
		);
	}
}

export default Register;
