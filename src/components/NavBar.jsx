import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../navbar-logo.png';
import { ColorRing } from 'react-loader-spinner';

function NavBar(props) {
  const navigate = useNavigate();

  const handleMoviesClick = () => {
    console.log(props);
    //navigate('/'); // Navigate to the movies page
  };

  const handleLogout = () => {
    localStorage.removeItem('authtoken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');

    props.setAuthtoken('');
    props.setUserId('');
    props.setUserName('');
    console.log('Logout');
    navigate('/');
  };

  const formatGreeting = (name) => {
    const lowerCaseName = name.toLowerCase();
    const formattedName = lowerCaseName.charAt(0).toUpperCase() + lowerCaseName.slice(1);
    return formattedName;
  };

  return (
    <div className='border flex items-center justify-between pl-12 py-4 '>
      <div className='flex items-center space-x-8'>
        <img src={Logo} alt='' />
        <h3 className='font-bold text-xl text-amber-500'>
          <Link to='/' onClick={handleMoviesClick}>
            Movies
          </Link>
        </h3>
        {/* <h3 className='font-bold text-xl text-amber-500'>
          <Link to='/favourites'>Favourites</Link>
        </h3> */}
        <h3 className='font-bold text-xl text-amber-500'>
          <Link to='/actors'>Actors</Link>
        </h3>
      </div>

      {props.authtoken === null ? (
        <h3 className='font-bold text-xl text-amber-500 pr-4'>
          <Link to='/login'>Login</Link>
        </h3>
      ) : (
        <div className='text-right pr-4'>
          {props.userName && (
            <p className='text-lg font-semibold text-amber-700 mb-1'>Welcome, {formatGreeting(props.userName)}!</p>
          )}
          <h3 className='font-extralight text-xl text-amber-500'>
            <Link onClick={handleLogout}>Logout</Link>
          </h3>
        </div>
      )}
    </div>
  );
}

export default NavBar;
