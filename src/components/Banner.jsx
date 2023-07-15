import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Oval } from 'react-loader-spinner';
function Banner() {
  let [bannerMovie, setBanner]=useState("")
  useEffect(function(){
    (function (){
      axios.get("https://api.themoviedb.org/3/trending/movie/week?api_key=af64e76d663517cdc595fc3a08de6d41")
  .then ((res)=>{
    // console.table(res.data.results);
    setBanner(res.data.results[0]);})
   
    })()
  },[])
  return (
    <>
        {
          bannerMovie==""? 
          <div className='flex justify-center'><Oval
          height="80"
          width="80"
          radius="9"
          color="gray"
          secondaryColor='red'
          ariaLabel="loading"
        /></div>:
          <div className={` h-[50vh] md:h-[70vh] bg-center bg-cover flex items-end`}
          style ={{backgroundImage:`url(https://image.tmdb.org/t/p/original/${bannerMovie.backdrop_path})`
            
          }}
          > 
          
              <div className='relative top-18 bottom-0 bg-gray-900 text-white text-2xl font-bold py-10 bg-opacity-50 text-center w-full'>{bannerMovie.title}</div>
            </div>

        }
            
        
    </>
  )
}

export default Banner