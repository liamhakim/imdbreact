import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from './Pagination';
import { Oval } from 'react-loader-spinner';
import MovieDetails from './MovieDetails';

function Movies() {
  const [movies, setMovies] = useState([]);
  const [pageNum, setPage] = useState(1);
  const [hovered, setHovered] = useState('');
  const [favourites, setFavorites] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    // fetchMovies(pageNum);
    fetchMovie();

  }, []);

  const fetchMovie = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/movie`
      );
      console.log(response.data);
      setMovies(response.data);

    } catch (error) {
      console.error('Error:', error);
    }
  };

  // const fetchMovies = async (page) => {
  //   try {
  //     const response = await axios.get(
  //       `https://api.themoviedb.org/3/trending/movie/week?api_key=af64e76d663517cdc595fc3a08de6d41&page=${page}`
  //     );
  //     setMovies(response.data.results);
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };

  const handleSearch = async (searchQuery) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=af64e76d663517cdc595fc3a08de6d41&query=${searchQuery}`
      );
      setSearchResults(response.data.results);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleMovieClick = async (movie) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movie.id}?api_key=af64e76d663517cdc595fc3a08de6d41&append_to_response=credits,videos,reviews`
      );
      const movieWithCredits = { ...movie, ...response.data };
      setSelectedMovie(movieWithCredits);
    } catch (error) {
      console.error('Error:', error);
    }
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
    <div className="mt-8 text-center">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search for a movie"
          onChange={(e) => handleSearch(e.target.value)}
          className="px-2 py-1 rounded-md border border-gray-300"
        />
        <button
          onClick={clearSelectedMovie}
          className="px-4 py-2 text-white bg-amber-500 rounded-md"
        >
          Clear
        </button>
      </div>

      {selectedMovie ? (
        <MovieDetails movie={selectedMovie} />
      ) : (
        <div>
          <div className="mb-8 font-bold text-2xl text-center">
            Trending Movies
          </div>
          <div className="flex flex-wrap justify-center">
            {searchResults.length > 0 ? (
              // Render search results
              searchResults.map((movie) => (
                <div
                  key={movie.id}
                  className="bg-center bg-cover w-[160px] h-[30vh] md:h-[40vh] md:w-[180px] m-4 rounded-xl hover:scale-125 border-2 duration-300 flex items-end relative"
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.poster_path})`,
                  }}
                  onClick={() => handleMovieClick(movie)}
                >
                  <div className="font-bold text-white bg-gray-900 bg-opacity-60 p-2 text-center w-full rounded-b-xl">
                    {movie.title}
                  </div>
                </div>
              ))
            ) : (
              // Render trending movies
              movies.slice(0, 3).map((movie) => (
                <div
                  key={movie.id}
                  className="bg-center bg-cover w-[160px] h-[30vh] md:h-[40vh] md:w-[180px] m-4 rounded-xl hover:scale-125 border-2 duration-300 flex items-end relative"
                  style={{
                    backgroundImage: `url(${movie.poster_url})`,
                  }}
                  // onClick={() => handleMovieClick(movie)}
                  // onMouseEnter={() => setHovered(movie.id)}
                  // onMouseLeave={() => setHovered('')}
                >
                                    <div className="font-bold text-white bg-gray-900 bg-opacity-60 p-2 text-center w-full rounded-b-xl">
                    {movie.title}
                  </div>
                </div>
              ))
            )}
          </div>
          <Pagination
            pageNum={pageNum}
            totalResults={20}
            resultsPerPage={1}
            onPrev={onPrev}
            onNext={onNext}
          />
        </div>
      )}
    </div>
  );
}

export default Movies;