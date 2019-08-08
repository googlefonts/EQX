import Link from 'next/link'
import Button from '@material/react-button';
import "../styles/main.scss"

const Header = () => (
  <div>
    Header
    <Button
      raised
      className='button-alternate'
      onClick={() => console.log('clicked!')}
    >
      Click Me!
    </Button>
  </div>
);

export default Header;