import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import React from "react";
import Head from "next/head";
import Link from "next/link";
import { unsetToken } from "../lib/auth";
import defaultPage from "../hocs/defaultPage";
import Cookie from "js-cookie";


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


class Layout extends React.Component {
	constructor(props) {
		super(props);
	}
	static async getInitialProps({ req }) {
		let pageProps = {};
		if (Component.getInitialProps) {
		pageProps = await Component.getInitialProps(ctx);
		}
  
		return { pageProps, isAuthenticated };
	}
	render() {
		const { isAuthenticated, children } = this.props;
		const title = "EQX";
		return (
			<div className="layout-wrapper">
			<Header headerType={this.props.headerType} progressBar={this.props.progressBar}/>
				{isAuthenticated ? (
					<>
						<h1>logged in</h1>
					</>
				) : (
					<>
						<h1>not logged in</h1>
					</>
				)}
				<Nav />
				<main>
					{this.props.children}
				</main>
				<Footer />
			</div>
		);
	}
};

export default defaultPage(Layout);
