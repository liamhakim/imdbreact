import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from './Pagination';
import { Oval } from 'react-loader-spinner';
import ActorDetails from './ActorDetails';

function Actors() {
  const [actors, setActors] = useState([]);
  const [pageNum, setPage] = useState(1);
  const [hovered, setHovered] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedActor, setSelectedActor] = useState(null);

  useEffect(() => {
    fetchActors(pageNum);
  }, [pageNum]);

  const fetchActors = async (page) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/person/popular?api_key=af64e76d663517cdc595fc3a08de6d41&page=${page}`
      );
      setActors(response.data.results);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSearch = async (searchQuery) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/person?api_key=af64e76d663517cdc595fc3a08de6d41&query=${searchQuery}`
      );
      setSearchResults(response.data.results);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleActorClick = (actor) => {
    setSelectedActor(actor);
  };

  const clearSelectedActor = () => {
    setSelectedActor(null);
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
          placeholder="Search for an actor"
          onChange={(e) => handleSearch(e.target.value)}
          className="px-2 py-1 rounded-md border border-gray-300"
        />
        <button
          onClick={clearSelectedActor}
          className="px-4 py-2 text-white bg-amber-500 rounded-md"
        >
          Clear
        </button>
      </div>

      {selectedActor ? (
        <div className="mt-4">
          <ActorDetails actorId={selectedActor.id} />
        </div>
      ) : (
        <div>
          <div className="mb-8 font-bold text-2xl text-center">
            Popular Actors
          </div>
          <div className="flex flex-wrap justify-center">
            {searchResults.length > 0 ? (
              // Render search results
              searchResults.map((actor) => (
                <div
                  key={actor.id}
                  className="bg-center bg-cover w-[160px] h-[30vh] md:h-[40vh] md:w-[180px] m-4 rounded-xl hover:scale-125 border-2 duration-300 flex items-end relative"
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${actor.profile_path})`,
                  }}
                  onClick={() => handleActorClick(actor)}
                >
                  
                  <div className="font-bold text-white bg-gray-900 bg-opacity-60 p-2 text-center w-full rounded-b-xl">
                    {actor.name}
                  </div>
                </div>
              ))
            ) : (
              // Render popular actors
              actors.map((actor) => (
                <div
                  key={actor.id}
                  className="bg-center bg-cover w-[160px] h-[30vh] md:h-[40vh] md:w-[180px] m-4 rounded-xl hover:scale-125 border-2 duration-300 flex items-end relative"
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${actor.profile_path})`,
                  }}
                  onClick={() => handleActorClick(actor)}
                >
                  <div
                    className="p-2 bg-gray-900 absolute top-2 right-2 rounded-xl"
                    style={{
                      display: hovered === actor.id ? 'block' : 'none',
                    }}
                  >
                    
                  </div>
                  <div className="font-bold text-white bg-gray-900 bg-opacity-60 p-2 text-center w-full rounded-b-xl">
                    {actor.name}
                  </div>
                </div>
              ))
            )}
          </div>
          <Pagination pageNum={pageNum} onPrev={onPrev} onNext={onNext} />
        </div>
      )}
    </div>
  );
}

export default Actors;
