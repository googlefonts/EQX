/* /pages/signin.js */ 
import React from "react";
import { strapiLogin } from "../lib/auth";

import Router from "next/router";

import defaultPage from "../hocs/defaultPage";
import Layout from '../components/Layout';
import { Grid, FormGroup, FormControl, FormLabel, Input, InputLabel, FormHelperText, Button } from '@material-ui/core';

import Cookies from "js-cookie";
// import "../styles/main.scss";

class SignIn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {
				email: "",
				password: ""
			},
			loading: false,
			error: ""
		};
	}
	componentDidMount() {
		if (this.props.isAuthenticated) {
			Router.push("/"); // redirect if you're already logged in
		}
	}

	onChange(propertyName, event) {
		const { data } = this.state;
		data[propertyName] = event.target.value;
		this.setState({ data });
	}
	onSubmit() {
		const {
			data: { email, username, password }
		} = this.state;
		const { context } = this.props;
		this.setState({ loading: true });

		strapiLogin(email, password).then(() => console.log(Cookies.get("user")));
	}
	render() {
		const { error } = this.state;
		return (
			<Layout>
				<Grid container>
					<Grid item xs={12}>
						<div className="notification">{error}</div>
						<FormGroup>
							<FormControl>
								<InputLabel>Username:</InputLabel>
								<Input onChange={this.onChange.bind(this, "username")} type="text" name="username" />
							</FormControl>
							<FormControl>
								<InputLabel>Email:</InputLabel>
								<Input onChange={this.onChange.bind(this, "email")} type="email" name="email" />
							</FormControl>
							<FormControl style={{ marginBottom: 30 }}>
								<InputLabel>Password:</InputLabel>
								<Input onChange={this.onChange.bind(this, "password")} type="password" name="password" />
							</FormControl>
							<FormControl>
								<span>
									<a href="">
										<small>Forgot Password?</small>
									</a>
								</span>
								<Button color="primary" onClick={this.onSubmit.bind(this)}>Submit</Button>
							</FormControl>
						</FormGroup>
					</Grid>
				</Grid>
	  		</Layout>
		);
	}
}
export default SignIn;