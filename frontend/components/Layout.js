import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';

const Layout = props => (
  <div class="layout-wrapper">
    <Header />
  	{/* <Nav /> to go here but unfinished currently */}
		<main>
  		{props.children}
  	</main>
  	<Footer/>
  </div>
);

export default Layout;