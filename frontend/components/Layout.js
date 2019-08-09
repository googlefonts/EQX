import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';

const Layout = props => (
  <div>
    <Header />
  	{/* <Nav /> to go here but unfinished currently */}
    	{props.children}
  	<Footer/>
  </div>
);

export default Layout;