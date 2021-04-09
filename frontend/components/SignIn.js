/* /pages/signin.js */ 
import React from "react";
import { strapiLogin } from "../lib/auth";
import axios from 'axios';

import Router from "next/router";

import defaultPage from "../hocs/defaultPage";
import Layout from '../components/Layout';
import SignUp from '../components/SignUp';
import {DialogActions, DialogContent, Dialog, DialogTitle, DialogContentText, Link, Typography, Icon, Card, CardContent, CardActions, InputAdornment, TextField, IconButton, Container, FilledInput, OutlinedInput, Grid, FormGroup, FormControl, FormLabel, Input, InputLabel, FormHelperText, Button } from '@material-ui/core';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import Cookies from "js-cookie";
// import "../styles/main.scss";


class SignIn extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			data: {
				username: "",
				email: "",
				password: ""
			},
			error: "",
			showPassword: false,

			openSignup: false,
		};
	}
	
	handleSignupOpen = () => {
	  this.setState({ openSignup: true});
	}

	handleSignupClose = () => {
	  this.setState({ openSignup: false});
	}

	handleClickShowPassword = () => {
		this.setState(prevState => ({
			showPassword: !prevState.showPassword
		}));
	}

	handleMouseDownPassword = event => {
		event.preventDefault();
	}

	componentDidMount = () => {
		if (this.props.isAuthenticated) {
			Router.push("/"); // redirect if you're already logged in
		}
	}

	onChange = (propertyName, event) => {
		const { data } = this.state;
		data[propertyName] = event.target.value;
		this.setState({ data });
	}

	onSubmit = () => {
		const {
			data: { email, password }
		} = this.state;
		const { context } = this.props;
		strapiLogin(email, password);
	}
	render() {
		const { error } = this.state;
		return (
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Card className="auth-card" style={{ margin: "2rem auto",padding: "2rem",maxWidth: "700px" }}>
						<CardContent>
							<div className="notification">{error}</div>
							<Typography variant="h4" align="center" gutterBottom>Lets get started!</Typography>
							<FormGroup>
								<FormControl>
									<InputLabel>Email</InputLabel>
									<Input onChange={this.onChange.bind(this, "email")} type="email" name="email" />
								</FormControl>
								<FormControl style={{ marginBottom: 30 }}>
									<InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
									<Input
										id="standard-adornment-password"
										type={this.state.showPassword ? 'text' : 'password'}
										value={this.password}
										onChange={this.onChange.bind(this, "password")}
										endAdornment={
											<InputAdornment position="end">
												<IconButton
													aria-label="toggle password visibility"
													onClick={this.handleClickShowPassword}
													onMouseDown={this.handleMouseDownPassword}
												>
													{this.showPassword ? <Visibility /> : <VisibilityOff />}
												</IconButton>
											</InputAdornment>
										}
									/>
								</FormControl>
								<FormControl>
									<Button color="primary" size="large" variant="contained" onClick={this.onSubmit.bind(this)}>Login</Button>
									<br/>
									<Typography variant="body2" align="center">By clicking, you agree to our <Link href="#">Customer Agreement</Link>.</Typography>
								</FormControl>
							</FormGroup>
						</CardContent>
					</Card>
					<br/>
					{/* <Typography variant="h6" align="center" gutterBottom>  
						<Link href="#" className="text-on-primary" onClick={this.handleSignupOpen}>Need to sign up?</Link>

						<Dialog open={this.state.openSignup} onClose={this.handleSignupClose}>
							<SignUp/>
                  </Dialog>
					</Typography> */}
					{/* <Typography variant="h6" align="center" gutterBottom>  
						<Link href="#" className="text-on-primary">Forgot Password?</Link>
					</Typography> */}
				</Grid>
			</Grid>
		);
	}
}
export default SignIn;