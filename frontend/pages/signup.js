/* /pages/signup.js */ 

import React from "react";
import { strapiRegister } from "../lib/auth";

// import Router from "next/router";

import Layout from '../components/Layout';
// import MaterialIcon from '@material/react-material-icon';
import {Cell, Grid, Row} from '@material/react-layout-grid';
import { FormGroup, FormControl, FormLabel, Input, InputLabel, FormHelperText, Button } from '@material-ui/core';

import "../styles/main.scss";

class SignUp extends React.Component {
  	constructor(props) {
		super(props);
		this.state = {
			data: {
				email: "",
				username: "",
				password: ""
			},
			loading: false,
			error: ""
		};
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
		this.setState({ loading: true });

		strapiRegister(username, email, password)
			.then(() => this.setState({ loading: false }))
			.catch(error => this.setState({ error: error }));
  	}

  	render() {
		const { error } = this.state;
		return (
			<Layout>
				<Grid>
					<Row>
						<Cell desktopColumns={12}>
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
						</Cell>
					</Row>
				</Grid>
			</Layout>
		);
  	}
}
export default SignUp;