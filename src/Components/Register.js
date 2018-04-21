import React,{Component} from 'react';
import {Link} from "react-router-dom";
import * as firebase from 'firebase';
import {
	Grid, Header, Form, Button, Image
} from 'semantic-ui-react';


import img from "../Assets/profile.png";


var admin = require('firebase-admin');


class Register extends Component{

	state={
		username:"",
		email: "",
		password: "",
		rePassword: "",
		err: false,
		loading: false,
		disable: true,
	}

	handleregister = () => {
		firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
		.catch(function(error) {
  		// Handle Errors here.
  		var errorCode = error.code;
  		var errorMessage = error.message;
  		// ...
		});
	}

	render(){

		setInterval(() =>{
			let us = this.state.password;
			let em = this.state.email;
			let pass = this.state.password;
			let re = this.state.rePassword;
			let er = this.state.err;
			if(us != "" && em != "" && pass != "" && re != "" && er == false ){
				this.setState({disable:false});
			}else{
				this.setState({disable:true});
			}
		},1000)
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

								<Form.Input placeholder="Username" icon="at" iconPosition="left"
									onChange={(event)=>{
										this.setState({username: event.target.value});
									}}
								/>
								<Form.Input placeholder="Email" type="email" icon="mail" iconPosition="left"
									onChange={(event)=>{
										this.setState({email: event.target.value})
									}}
								/>
								<Form.Input placeholder="Password (min. 6)" type="password" icon="lock" iconPosition="left"
									onChange={(event) => {
										this.setState({password:event.target.value});
									}}
								/>
								<Form.Input placeholder="Confirm Password" type="password" icon="lock" iconPosition="left" error={this.state.err}
									onChange={(event)=>{
										this.setState({rePassword: event.target.value});
										var p = event.target.value;
										if(p != this.state.password){
											this.setState({err: true});
										}
										if(p === this.state.password){
											this.setState({err: false});
										}
									}}
								/>

								<Button
									color="grey"
									className="btnForm"
									loading={this.state.loading}
									disabled={this.state.disable}
									onClick={()=> {
										this.handleregister();
										this.setState({loading:true});
									}}
								>
								Join now</Button>
							</Form>
							<Header>
								<Link to="/" style={{color:'white'}} >if you have an account, click here.</Link>
							</Header>
						</Grid.Column>

					</Grid.Row>

				</Grid>

			</div>
		);
	}
}

export default Register;
