import React from 'react'
import "../stylesheets/VideoBackground.css"
import useMovieById from '../hooks/useMovieById'
import { useSelector } from 'react-redux'

const VideoBackground = ({movieId, bool}) => {
  useMovieById(movieId);

  const trailer = useSelector(store=>store.movie.movieTrailer)
  // console.log("from videoBG ",trailer, movieId)

  const trailerKey = trailer && trailer.key ? trailer.key : '';

  return (
    <div className="video-container">
      <iframe
        className={bool ? "" : ' w-screen h-screen -mt-36' }
        src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&loop=1&mute=1`}
        allowFullScreen
        frameBorder="0"
      ></iframe>
    </div>
  )
}

export default VideoBackground
