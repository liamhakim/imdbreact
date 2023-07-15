import React from 'react';
import { Link } from 'react-router-dom';

function MovieDetails({ movie }) {
  const trailer = movie.videos?.results?.find(
    (video) => video.type === 'Trailer'
  );

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center my-4">
        <div className="text-3xl font-bold">{movie.title}</div>
        
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/3">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt={`${movie.title} poster`}
            className="rounded-md shadow-md"
          />
        </div>
        <div className="w-full md:w-2/3 md:pl-4 my-4">
          <div className="text-lg font-bold my-2">{movie.tagline}</div>
          <div className="text-gray-500 my-2">{movie.overview}</div>
          <div className="my-4">
            <div className="font-bold">Genres:</div>
            <div className="flex flex-wrap">
              {movie.genres.map((genre) => (
                <div
                  key={genre.id}
                  className="bg-gray-200 rounded-md px-2 py-1 mr-2 my-1"
                >
                  {genre.name}
                </div>
              ))}
            </div>
          </div>
          <div className="my-4">
            <div className="font-bold">Cast:</div>
            <div className="flex flex-wrap">
              {movie.credits.cast.slice(0, 6).map((cast) => (
                <div
                  key={cast.id}
                  className="bg-gray-200 rounded-md px-2 py-1 mr-2 my-1"
                >
                  {cast.name}
                </div>
              ))}
            </div>
          </div>
          {trailer && (
            <div className="my-4">
              <div className="font-bold">Trailer:</div>
              <div className="mt-2">
                <iframe
                  title={`${movie.title} trailer`}
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;