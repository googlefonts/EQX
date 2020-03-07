/* /pages/signup.js */ 

import React from "react";
import { strapiLogin } from "../lib/auth";
import axios from 'axios';
import { Link, Typography, FormGroup, FormControl, Card, CardContent, FormLabel, Input, InputLabel, InputAdornment, FormHelperText, IconButton, Button } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import "../styles/main.scss";

class SignUp extends React.Component {
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
			textFieldSignupValue: ""
		};
  	}

  	handleChange = (propertyName, event) => {
		const { data } = this.state;
		data[propertyName] = event.target.value;
		this.setState({ data });
   }
     
   handleClickShowPassword = () => {
      this.setState(prevState => ({
         showPassword: !prevState.showPassword
      }));
   }
  
  	handleSubmit = () => {
		const { data: { email, username, password } } = this.state;
		this.setState({ loading: true });

		axios
			.post('http://localhost:1337/auth/local/register', {
				username: username,
				email: email,
				password: password,
         }).catch(error => { console.log(error); // Handle Error
			}).then(response => { // Handle success.
            strapiLogin(email, password);
			});
  	}

  	render() {
		const { error } = this.state;
		return (
         <>
            <Card className="auth-card" style={{padding: "2rem",maxWidth: "700px" }}>
               <CardContent>
                  <div className="notification">{error}</div>
                  <Typography variant="h4" align="center" gutterBottom>Join EQX</Typography>
                  <FormGroup>
                     <FormControl>
                        <InputLabel>Username</InputLabel>
                        <Input onChange={this.handleChange.bind(this, "username")} type="text" name="username" />
                     </FormControl>
                     <FormControl>
                        <InputLabel>Email</InputLabel>
                        <Input onChange={this.handleChange.bind(this, "email")} type="email" name="email" />
                     </FormControl>
                     <FormControl style={{ marginBottom: 30 }}>
                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                        <Input
                           id="standard-adornment-password"
                           type={this.state.showPassword ? 'text' : 'password'}
                           value={this.password}
                           onChange={this.handleChange.bind(this, "password")}
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
                        <Button color="primary" size="large" variant="contained" onClick={this.handleSubmit.bind(this)}>Sign Up</Button>
                        <br/>
                        <Typography variant="body2" align="center">By clicking, you agree to our <Link href="#">Customer Agreement</Link>.</Typography>
                     </FormControl>
                  </FormGroup>
               </CardContent>
            </Card>
         </>
		);
  	}
}
export default SignUp;