import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { TbListSearch } from 'react-icons/tb';
import { useContext } from 'react';
import AppContext from '../../Context/context';

const Navigation = () => {
  const { upadateSearchVisibility } = useContext(AppContext);

  const clickHandler = () => {
    upadateSearchVisibility();
  };

  return (
    <Navbar expand='lg' className='bg-body-tertiary'>
      <Container>
        <Navbar.Brand as={Link} to='/'>
          Jobs Manager
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ms-auto'>
            <Link className=' mx-3' to='/'>
              Customers
            </Link>
            <Link className=' mx-3' to='/allJobs'>
              Jobs
            </Link>
            <TbListSearch
              onClick={() => {
                clickHandler();
              }}
              className=' text-success ms-5 icon'
              size={30}
            />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
