import React, { useEffect, useState } from "react";
import axios from "axios";
import { isLoggedIn, getUserInfo } from "./Login";
const formatdate = (isoDate) => {
  const dateObject = new Date(isoDate);
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const day = String(dateObject.getDate()).padStart(2, "0");
  const hours = String(dateObject.getHours()).padStart(2, "0");
  const minutes = String(dateObject.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};



const MovieDetails = ({ movieId }) => {
  const [authenticated, setAuthenticated] = useState(isLoggedIn());
  const [movie, setMovie] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [ratingValue, setRatingValue] = useState(0);
  const [yourRatingValue, setYourRatingValue] = useState(null);
  const [reviewContent, setReviewContent] = useState("");
  

  const fetchMovieDetails = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/movie/${movieId}`
      );

      setMovie(response.data);
      // fetchTrailer(response.data.trailer_url);
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleYourRating = async () => {
    const userInfo = getUserInfo();
    const access_token = userInfo.access_token;
  
    try {
      const response = await axios.get(
        "http://localhost:8000/ratings",
        {
          params: {
            movie_id: movie.id,
          },
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      setYourRatingValue(response.data.rating_value);
      
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Function to handle review deletion
  const handleDeleteReview = (reviewId) => {
  
      const userInfo = getUserInfo();
      const access_token = userInfo.access_token;
      //const formData = new FormData();
      //formData.append('review_id',reviewId);
      fetch(`http://localhost:8000/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${access_token}`,
        },
      })
      .then((response) => response.json())
    .then((data) => 
    {
      console.log(data); // Optional: You can log the response from the server if needed.
      // If the deletion was successful, update the local state to remove the deleted review
      
        setMovie((prevMovie) => ({
          ...prevMovie,
          reviews: prevMovie.reviews.filter((review) => review.id !== reviewId),
        }));
      
    })
    .catch((err) => {
     console.log(err.message);
    });
      // Make a DELETE request to the server to delete the review with the provided reviewId
      
      
  };

  useEffect(() => {
    // Fetch the movie details from the backend when the component mounts
    fetchMovieDetails();
  }, [movieId]);
  
  useEffect(() => {
    // Run handleYourRating() after the movie state has been updated with the response from fetchMovieDetails()
    if (movie) {
      handleYourRating();
    }
  }, [movie]);

  const handleAddRating = async () => {
    try {
      const userInfo = getUserInfo();
      const access_token = userInfo.access_token;

      

      const response = await axios.post(
        "http://127.0.0.1:8000/ratings",
        {
          rating_value: ratingValue,
          movie_id: movie.id,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      
      setYourRatingValue(response.data.rating_value);
      

      // Optional: You can display a success message to the user if needed.
      console.log("Rating added successfully!");

      // Clear the rating input after adding the rating
      setRatingValue(0);
    } catch (error) {
      console.error("Error:", error);
      // Optional: You can display an error message to the user if needed.
    }
  };

  const handleRatingChange = (event) => {
    const inputValue = parseInt(event.target.value, 10); // Convert the input value to an integer

    // Check if the input value is a number between 1 and 10
    if (!isNaN(inputValue) && inputValue >= 1 && inputValue <= 10) {
      setRatingValue(inputValue);
    } else {
      // If the input value is not between 1 and 10, you can show an error or handle it as you see fit
      // For example, you can set the ratingValue to a default value or display a warning message.
      // Here, I'm setting it to 1 as a default value.
      setRatingValue(1);
    }
  };

  const handleReviewChange = (event) => {
    setReviewContent(event.target.value);
  };

  const handleSubmitReview = async (event) => {
    event.preventDefault();

    const createReview = async () => {
      //Perform API request to create review

      try {
        const userInfo = getUserInfo();

        const access_token = userInfo.access_token;
        const currentDate = new Date(); // Get the current date
        const isoDate = currentDate.toISOString();

        const response = await axios.post(
          "http://127.0.0.1:8000/reviews",
          {
            content: reviewContent,
            movie_id: movie.id,
            date: isoDate,
          },
          {
            headers: {
              Authorization: `Bearer ${userInfo.access_token}`,
            },
          }
        );

        const newReview = {
          ...response.data,
          user: { 
            id: userInfo.user_id,
            username: userInfo.username },
        };

        setMovie((prevMovie) => ({
          ...prevMovie,
          // reviews: prevMovie.reviews.filter((review) => review.id !== reviewId),
           reviews: [newReview, ...prevMovie.reviews],
        }));

        setReviewContent(""); //clear review input field
      } catch (error) {
        console.log(error);
      }
    };

    createReview();
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-8 text-center bg-gradient-to-r from-orange-400 to-amber-100	 ">
      <div className="flex flex-col items-center">
        <div className="flex mt-8 p-4 border border-black rounded-lg shadow-300">
          <img 
            src={movie.poster_url}
            alt={movie.title}
            className="h-96 object-cover rounded-lg "
          />
          <div className="flex flex-col mr-8 font-medium">
            <h2 className="text-2xl font-bold pt-8">{movie.title}</h2>
            <p className="text-gray-600">{movie.release_date}</p>
            <p className="mt-2 pt-4">
  Average Rating: <br />
  <span
    style={{
      backgroundColor: "#ff6b6b", 
      borderRadius: "8px", //  border radius to create a rounded shape
      padding: "8px 12px", // padding to create a space between the container and the content
      marginTop : "12px",
     
      display: "inline-block", // display to create a block element
    }}
  >
    ⭐{movie.average_rating}/10
  </span>
</p>

            <p className="mt-2 pt-4">Category: {movie.category?.name}</p>
            <p className="mt-2 pt-4">
              Summary: <br />
              <br />
              {movie.plot_summary}
            </p>
          </div>
        </div>
        {movie.trailer_url && (
          <div className="mt-4 p-4">
            <iframe
              title="Trailer"
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${
                movie.trailer_url.split("=")[1]
              }`}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        )}

        <div className="flex mt-8">
          <div className="w-1/2 pr-4">
            <div className="flex items-center">
              <p className="mr-2">Rating:</p>
              <input
                type="number"
                min="0"
                max="10"
                value={ratingValue}
                onChange={handleRatingChange}
                className="w-16 px-2 py-1 rounded-md border border-gray-300"
              />
              {authenticated && ( // Check if the user is authenticated
                <button 
                  onClick={handleAddRating}
                  className="border border-gray-300 px-4 py-2 text-white bg-amber-500 rounded-md ml-2 bg-gradient-to-r from-amber-400 to-red-500 hover:from-pink-500 hover:to-yellow-500"
                >
                  Add Rating
                  
                </button>
                
              )}
            </div> {authenticated && yourRatingValue && ( <p className="text-black text-600 font-bold text lg pt-2">Your Rating: <span style={{
      backgroundColor: "#ff6b6b", 
      borderRadius: "8px", //  border radius to create a rounded shape
      padding: "8px 12px", // padding to create a space between the container and the content
      marginTop : "12px",
     
      display: "inline-block", // display to create a block element
    }}>{yourRatingValue}</span> </p>)}
          </div>
          <div className="w-1/2 pl-4">
            {authenticated ? (
              <form onSubmit={handleSubmitReview} className="mb-4 flex items-center">
                <textarea
                  value={reviewContent}
                  onChange={handleReviewChange}
                  placeholder="Write your review here..."
                  className="w-full h-24 px-2 py-1 rounded-md border border-gray-300"
                />
                <button
                  type="submit"
                  className="border border-gray-300 px-4 py-2 text-white bg-amber-500 rounded-md ml-2 bg-gradient-to-r from-amber-400 to-red-500 hover:from-pink-500 hover:to-yellow-500"
                >
                  Add Review
                </button>
              </form>
            ) : (
              <p className="text-red-500 font-bold">Please log in to be able to interact with Rating and Reviews</p>
            )}

            {movie.reviews.length > 0 ? (
              <div className="mt-4">
                <h3 className="text-lg font-bold mb-2">Reviews:</h3>
                {movie.reviews.map((review) => (
                  <div key={review.id} className="reviews-item mb-4">
                    <p className="text-gray-600 font-bold">By: {review.user?.username}</p>
                    <p className="text-gray-600 mb-1">
                      {formatdate(review.date)}
                    </p>
                    <p className="mt-1">{review.content}</p>
                    {/* Add the delete button only if the review is authored by the currently logged-in user */}
                    {authenticated && review.user.id?.toString() === getUserInfo().user_id 
                    && (
                      <button
                        onClick={() => handleDeleteReview(review.id)}
                        className="border border-gray-300 px-2 py-1 text-white bg-red-500 rounded-md ml-2"
                      >
                        Delete
                      </button>
                    )}
                    <div className="border-t border-gray-300 mt-2 pt-2 text-gray-600 text-sm">
                      {/* Optional: You can display additional review information here */}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No reviews available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
