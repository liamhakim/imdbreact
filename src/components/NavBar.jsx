import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../navbar-logo.png';

function NavBar({ clearSearchResults }) {
  const navigate = useNavigate();

  const handleMoviesClick = () => {
    clearSearchResults();
    navigate('/'); // Navigate to the movies page
  };

  return (
    <div className='border flex items-center space-x-8 pl-12 py-4'>
      <img src={Logo} alt='' />
      <h3 className='font-bold text-xl text-amber-500'>
        <Link to='/' onClick={handleMoviesClick}>
          Movies
        </Link>
      </h3>
      <h3 className='font-bold text-xl text-amber-500'>
        <Link to='/favourites'>Favourites</Link>
      </h3>
      <h3 className='font-bold text-xl text-amber-500'>
        <Link to='/actors'>Actors</Link>
      </h3>
    </div>
  );
}

export default NavBar;
