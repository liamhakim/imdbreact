import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from './Pagination';
import { Oval } from 'react-loader-spinner';
import MovieDetails from './MovieDetails';

function Movies() {
  const [movies, setMovies] = useState([]);
  const [pageNum, setPage] = useState(1);
  const [favourites, setFavorites] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/movie');
        setMovies(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchMovies();
  }, []);

  const handleSearch = async (searchQuery) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/movie?title=${searchQuery}`);
      setMovies(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie.id);
  };

  const clearSelectedMovie = () => {
    setSelectedMovie(null);
  };

  const addEmoji = (id) => {
    const newFav = [...favourites, id];
    setFavorites(newFav);
  };

  const removeEmoji = (id) => {
    const filteredFav = favourites.filter((elem) => {
      return elem !== id;
    });
    setFavorites(filteredFav);
  };

  const onPrev = () => {
    if (pageNum > 1) {
      setPage(pageNum - 1);
    }
  };

  const onNext = () => {
    setPage(pageNum + 1);
  };

  return (
  <div className=" text-center bg-gradient-to-r from-orange-400 to-amber-100" >

  
    <div className=" pt-8">
      <div className="mb-4 w-80 mx-auto  ">
        <input
          type="text"
          placeholder="Search for a movie"
          onChange={(e) => handleSearch(e.target.value)}
          className="border border-black border-300 px-2 py-1 rounded-md border border-gray-300"
        />
        <button
          onClick={clearSelectedMovie}
          className="border border-gray-300 px-4 py-2 text-white bg-gradient-to-r from-amber-400 to-red-500 hover:from-pink-500 hover:to-yellow-500 rounded mt-2 "
        >
          Clear
        </button>
      </div>

      {selectedMovie ? (
        <MovieDetails movieId={selectedMovie} />
      ) : (
        <div>
          <div className="mb-8 font-bold text-2xl text-center">Trending Movies</div>
          <div className="flex flex-wrap justify-center">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="bg-center bg-cover w-[160px] h-[30vh] md:h-[40vh] md:w-[180px] m-4 rounded-xl hover:scale-125 border-2 duration-300 flex items-end relative"
                style={{
                  backgroundImage: `url(${movie.poster_url})`,
                }}
                onClick={() => handleMovieClick(movie)}
              >
                <div className="font-bold text-white bg-gray-900 bg-opacity-60 p-2 text-center w-full rounded-b-xl">
                  {movie.title}
                </div>
              </div>
            ))}
          </div>
          {/* <Pagination
            pageNum={pageNum}
            totalResults={20}
            resultsPerPage={1}
            onPrev={onPrev}
            onNext={onNext}
          /> */}
        </div>
      )}
    </div>
    </div>
  );
}

export default Movies;
