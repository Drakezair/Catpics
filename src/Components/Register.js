import React,{Component} from 'react';
import {Link} from "react-router-dom";
import * as firebase from 'firebase';
import {
	Grid, Header, Form, Button, Image
} from 'semantic-ui-react';


import img from "../Assets/profile.png";

class Register extends Component{

	state={
		username:"",
		email: "",
		password: "",
		rePassword: "",
		emer: false,
		erro: false,
		err: false,
		loading: false,
		disable: true,
	}


	handleregister = () => {
		firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(()=>{

			firebase.auth().onAuthStateChanged((user)=>{
				if(user){

					firebase.database().ref('users/' + this.state.username + "/" + user.uid).set({

						username: this.state.username,
						email: this.state.email,


					});

					firebase.database().ref('users/' + this.state.username).set({
						profileUrl: "",
						likes: 0,
						posts: 0,
					});

					user.updateProfile({
						displayName: this.state.username,
					});
					user.sendEmailVerification()
					.then(()=>{
						this.props.history.push("/timeline");
						clearInterval(this.fill);
					});
				}
		});
	})
		.catch((error)=> {
			this.setState({loading:false})
  		// Handle Errors here.
  		var errorCode = error.code;
  		var errorMessage = error.message;

			alert(errorCode);
  		// ...

			if(errorCode === "auth/email-already-in-use"){
				alert("there already exists an account with the given email address.")
			}

		});
	}



 		fill = setInterval(() =>{
			let us = this.state.username;
			let em = this.state.email;
			let pass = this.state.password;
			let re = this.state.rePassword;
			let er = this.state.err;
			let erro = this.state.erro;
			let erm = this.state.emer;
			if(us !== "" && em !== "" && pass !== "" && re !== "" && er === false && erm === false && erro === false){
				this.setState({disable:false});
			}else{
				this.setState({disable:true});
			}
		},200);

	render(){

		return(
				<Grid padded centered verticalAlign="middle" className="register forms" >
					<Grid.Column textAlign="center" width={16} >
						<Header
							as="h1"
							style={{
									margin: 0
							}}
						>
							<Image
								style={{
										display: "block",
										margin: "0 auto",
								}}
								src={img}
							/>
							Register
							<br/>
						</Header>
					</Grid.Column>
					<Grid.Column computer={5} tablet={8} mobile={14} textAlign="center">
						<Form size="big" className="formRegister">

							<Form.Input placeholder="Username" icon="at" iconPosition="left"  error={this.state.emer}
								onChange={(event)=>{
									this.setState({username: event.target.value});
									var me = event.target.value;

									this.setState({emer:false});

									firebase.database().ref('users/').once('value', (snapshot)=>{
										snapshot.forEach((snapchilds)=>{
											var keys  = snapchilds.key;
											if(keys === me){
												this.setState({emer:true});
											}
										})
									});
								}}
							/>
							<Form.Input placeholder="Email" type="email" icon="mail" iconPosition="left"
								onChange={(event)=>{
									this.setState({email: event.target.value})
								}}
							/>
							<Form.Input placeholder="Password (min. 6)" type="password" icon="lock" iconPosition="left" error={this.state.erro}
								onChange={(event) => {
									this.setState({password:event.target.value});
									var pa = event.target.value;
									if(pa.length < 6){
										this.setState({erro:true})
									}else {
										this.setState({erro:false})
									}
									if(pa !== this.state.rePassword){
										this.setState({err: true});
									}else{
										this.setState({err: false});
									}
								}}
							/>
							<Form.Input placeholder="Confirm Password" type="password" icon="lock" iconPosition="left" error={this.state.err}
								onChange={(event)=>{
									this.setState({rePassword: event.target.value});
									var p = event.target.value;
									if(p !== this.state.password){
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
							<Link to="/" style={{color:'white'}} > if you have an account, click here.</Link>
						</Header>
					</Grid.Column>
				</Grid>

		);
	}
}

export default Register;
