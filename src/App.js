// App.js
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Redirect } from 'react-router-dom';
import './App.css';
import Banner from './components/Banner';
import Movies from './components/Movies';
import NavBar from './components/NavBar';
import Pagination from './components/Pagination';
import Favourites from './components/Favourites';
import PageNotFound from './components/PageNotFound';
import MovieDetails from './components/MovieDetails';
import Actors from './components/Actors';
import Login from './components/Login';
import ActorDetails from './components/ActorDetails';


function App() {

  const [authtoken,setAuthtoken] = React.useState('');
  const [userId,setUserId] = React.useState('');
  const [userName,setUserName] = React.useState('');

  useEffect(() => {    
      setAuthtoken(localStorage.getItem('authtoken'));
      setUserId(localStorage.getItem('userId'));
      setUserName(localStorage.getItem('userName'));     

      
  },[authtoken]);


  return (
      <BrowserRouter>
        <NavBar  userId={userId} userName={userName} authtoken={authtoken} setAuthtoken={setAuthtoken} setUserId={setUserId} setUserName={setUserName}></NavBar>
        <Routes>
          {/* Show the LoginPage component if the user is not authenticated */}
          

          {/* Show the main content if the user is authenticated */}
          <Route path="/" element={<MainContent />} />

          <Route path="/fav" element={<Favourites></Favourites>}></Route>
          <Route path="/movies/:movieId" element={<MovieDetails />} />
          <Route path="/actors" element={<Actors />} />
          <Route path="/login" element={<Login setAuthtoken={setAuthtoken} setUserId={setUserId} setUserName={setUserName} />} />
          <Route path="/actors/:actorId" element={<ActorDetails />} />
          <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
        </Routes>
      </BrowserRouter>
  );
}

// Main content component (Banner and Movies)
const MainContent = () => (
  <>
    <Banner />
    <Movies />
  </>
);

export default App;
