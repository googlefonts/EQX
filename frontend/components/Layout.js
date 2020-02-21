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
import theme from '../src/theme';

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
// import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
// import { purple, blue } from '@material-ui/core/colors';

// const primary = "#6F1B93";

// let theme = createMuiTheme({
// 	palette: {
//    	primary: purple,
// 		// secondary: blue,
// 		background: {
// 			paper2: "rgb(245, 245, 245)",
// 			footer: "rgb(224, 224, 224)"
// 		}
// 	},
// });

// theme = responsiveFontSizes(theme);
// theme.overrides = {
// 	...theme.overrides,
// 	MuiDrawer:{
// 		...theme.MuiDrawer,
// 		paperAnchorDockedRight: {
// 			...theme.paperAnchorDockedRight,
// 			borderLeft: "none",
// 			paddingTop: '64px',
// 			width: 230
// 		}
// 	},
// 	MuiListItem: {
// 		...theme.MuiListItem,
// 		root: {
// 			...theme.root,
// 			"&$selected": { 
// 				background: theme.palette.primary.main,
// 				color: "white",
// 				"& .MuiSvgIcon-root": {
// 					color: "white",
// 				 },
// 			}
// 		}
// 	},
// }

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
		// console.log(this.props);
		
		// let isAuthenticated = false;
		// if	(Cookies.get("jwt")){
		// 	isAuthenticated = true;
		// }
		// const title = "EQX";
		// console.log(this.props);
		console.log(Cookies.get("user"));
		return (
			<ThemeProvider theme={theme}>
				<div className="layout-wrapper">
					<Header 
						auth={this.props.isAuthenticated} 
						headerType={this.props.headerType} 
						progressBar={this.props.progressBar}
					/>
					{this.props.isAuthenticated ? (	
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
