import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Oval } from 'react-loader-spinner';

function ActorDetails({ actorId }) {
  const [actor, setActor] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActorDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/person/${actorId}?api_key=af64e76d663517cdc595fc3a08de6d41`
        );
        setActor(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchActorDetails();
  }, [actorId]);

  const cardStyles = {
    border: '1px solid #e2e8f0',
    padding: '0.5rem',
    backgroundColor: '#fff',
    borderRadius: '0.25rem',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.15)',
    maxWidth: '900px',
    margin: '0 auto',
    lineHeight: '1.5',
    textAlign: 'center',
    boxSizing: 'border-box',
  };

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center mt-8">
          <Oval color="#f57c00" height={80} width={80} />
        </div>
      ) : (
        <div className="flex flex-col items-center mt-8">
          <img
            src={`https://image.tmdb.org/t/p/original${actor.profile_path}`}
            alt={`${actor.name} profile`}
            className="w-60 h-90 rounded-full object-cover border-4 border-amber-500"
          />
          <div className="font-bold text-2xl mt-4">{actor.name}</div>
          <div style={cardStyles} className="mt-4">
            <h2 className="text-xl font-medium mb-2">Biography</h2>
            <p className="text-gray-600">{actor.biography}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ActorDetails;