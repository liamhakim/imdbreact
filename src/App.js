import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Banner from './components/Banner';
import Movies from './components/Movies';
import NavBar from './components/NavBar';
import Pagination from './components/Pagination';
import Favourites from './components/Favourites';
import PageNotFound from './components/PageNotFound';
import MovieDetails from './components/MovieDetails';
import Actors from './components/Actors';
import ActorDetails from './components/ActorDetails'; // Update the import statement for ActorDetails

function App() {
  return (
    <BrowserRouter>
      <NavBar></NavBar>
      <Routes>
        <Route path='/' element={
          <>
            <Banner></Banner>
            <Movies></Movies>
          </>
        }></Route>
        <Route path='/fav' element={<Favourites></Favourites>}></Route>
        <Route path="/movies/:movieId" element={MovieDetails}></Route>
        <Route path="/actors" element={<Actors />} />
        <Route path="/actors/:actorId" element={<ActorDetails />} /> {/* Add the route for ActorDetails */}
        <Route path='*' element={<PageNotFound></PageNotFound>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
