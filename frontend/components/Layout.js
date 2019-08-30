import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';

const Layout = props => (
  	<div className="layout-wrapper" data-has-progress-header={props.headerType}>
   	<Header headerType={props.headerType} progressBar={props.progressBar}/>
  		<Nav />
			<main>
  			{props.children}
  		</main>
  		<Footer />
  	</div>
);

export default Layout;