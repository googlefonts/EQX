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

// const Layout = props => (
// 	<div className="layout-wrapper" data-has-progress-header={props.headerType}>
// 	 <Header headerType={props.headerType} progressBar={props.progressBar}/>
// 		<Nav />
// 	  <main>
// 			{props.children}
// 		</main>
// 		<Footer />
// 	</div>
// );

import { ThemeProvider } from '@material-ui/styles';
import theme from '../src/theme';


class Layout extends React.Component {
	constructor(props) {
		super(props);
	}
	static async getInitialProps({ req }) {
		let pageProps = {};
		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx);
		}
		
		return { pageProps };
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
				<div className="layout-wrapper">
					<Header 
						auth={this.props.isAuthenticated} 
						headerType={this.props.headerType} 
						progressBar={this.props.progressBar}
					/>
					{	this.props.isAuthenticated ? (	
						<>
							{	// Logged In
								<div>
									<SideNav page={this.props.page}/>
									<main>
										{/* <Container maxWidth={false}> */}
											{this.props.children}
											{/* {...this.props}  */}
										{/* </Container> */}
									</main>
								</div>
							}
						</>
					) : (
						<>
							{	// Not logged In
								<div>
									<main className="no-auth">
										<SignIn/>
									</main>
								</div>
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
