import React, { useEffect,useState } from 'react';
import Pagination from "./Pagination";


function Favourites() {
  let [genres, setGenres] = useState([]);
  let genreids = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation', 35: 'Comedy',
    80: 'Crime', 99: 'Documentary',
    18: 'Drama', 10751: 'Family',
    14: 'Fantasy', 36: 'History',
    27: 'Horror',
    10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller',
    10752: 'War',
    37: 'Western'
  }
  let movies = [
    
  ]

  useEffect(() => {
    let temp = movies.map((movie) => genreids[movie.genre_ids[0]])
    // console.log(temp)
    temp = new Set(temp)
    setGenres(["All Genres", ...temp]);
  }, [])




  return (
    <>
      <div className="mt-6 flex space-x-2 justify-center">
        
        {genres.map((genre => {
          return (
            <button
              className='py-1 px-2 bg-gray-400 rounded-lg font-bold text-lg text-white hover:bg-blue-400'
            > {genre}</button>
          )
        }))}

      </div>
      <div className="mt-4 flex justify-center space-x-2
      ">
        <input type="text" placeholder='search'
          className=" border-2 py-1 px-2 text-center"
        />
        <input type="number" className="border-2 py-1 px-2 text-center"
          value={1}
        />
      </div>
      <div class="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
        <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">Name</th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                <div className='flex'>
                  <img src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-up-arrows-those-icons-lineal-those-icons-3.png" class="mr-2 cursor-pointer"></img>
                  <div>Rating</div>
                  <img src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-down-arrows-those-icons-lineal-those-icons-4.png" class="ml-2 mr-2"></img>
                </div>

              </th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900 ">
                <div className='flex'>
                  <img src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-up-arrows-those-icons-lineal-those-icons-3.png" class="mr-2 cursor-pointer"></img>
                  <div>Popularity</div>
                  <img src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-down-arrows-those-icons-lineal-those-icons-4.png" class="ml-2 mr-2"></img>
                </div>
              </th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900 ">Genre</th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">Remove</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 border-t border-gray-100">
            {movies.map((movie) => {
              { console.log(movie) };
              return <tr class="hover:bg-gray-50" key={movie.id}>
                <th class="flex items-center px-6 py-4 font-normal text-gray-900 space-x-2">
                  <img
                    class="h-[6rem]  w-[10rem] object-fit"
                    src={`https://image.tmdb.org/t/p/original/t/p/original/${movie.poster_path}`}

                    alt=""
                  />
                  <div class="font-medium text-gray-700  text-sm">{movie.title}</div>

                </th>
                <td class="px-6 pl-12 py-4">
                  {movie.vote_average.toFixed(2)}
                </td>
                <td class="px-6 py-4 pl-12">{movie.popularity.toFixed(2)}</td>
                <td class="px-6 py-4">
                  <div class="flex gap-2">
                    <span
                      class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600"
                    >
                      {genreids[movie.genre_ids[0]]}
                    </span>

                  </div>
                </td>
                <td class="px-6 py-4">
                  <span
                    class="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold text-red-600"
                  >
                    Delete
                  </span>
                </td>
              </tr>
            })}




          </tbody>
        </table>
      </div>
      <Pagination></Pagination>
    </>
  )
}

export default Favourites;
