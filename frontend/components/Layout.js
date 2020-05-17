import Header from './Header';
import SideNav from './SideNav';
import Footer from './Footer';
import React from "react";
import Head from "next/head";
import Link from "next/link";
import { unsetToken, checkAuth } from "../lib/auth";
import defaultPage from "../hocs/defaultPage";
import Cookies from "js-cookie";
import SignIn from "../components/SignIn";
import { Menu, AppBar, Container, Grid, Button, Typography } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import theme from '../src/theme';

class Layout extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			multiSideNav: false
		};
	}
	static async getInitialProps({ req }) {
		let pageProps = {};
		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx);
		}
		return { pageProps };
	}
	sideNavUpdate = () => {
		this.setState(prevState => ({
			multiSideNav: !prevState.multiSideNav
		}));
	}
	render() {
		
		// let isAuthenticated = false;
		// if	(Cookies.get("jwt")){
		// 	isAuthenticated = true;
		// }
		// const title = "EQX";
		// console.log(this.props);
		return (
			<ThemeProvider theme={theme}>
				<div className="layout-wrapper" data-multi-side-nav={this.state.multiSideNav}>
					<Header 
						auth={this.props.isAuthenticated} 
						{...this.props}
					/>
					{ this.props.isAuthenticated ? (	
						<>
							{	// Logged In
								<>
									<SideNav sideNavUpdate={this.sideNavUpdate} {...this.props}/>
									<main>
										{/* <Container maxWidth={false}> */}
											{this.props.children}
											{/* {...this.props}  */}
										{/* </Container> */}
									</main>
								</>
							}
						</>
					) : (
						<>
							{	// Not logged In
								<>
									<main className="no-auth">
										<SignIn/>
									</main>
								</>
							}
						</>
					)}
					<Footer />
				</div>
			</ThemeProvider>
		);
	}
};

export default Layout;
