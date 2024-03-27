import React from 'react'
import { Banner_Url } from '../utils/constant'
import { useDispatch } from 'react-redux'
import { getById, setOpen } from '../redux/movieSlice';

const MovieCard = ({posterPath, movie}) => {

  const dispatch = useDispatch();
  const handleOpen = () => {
    dispatch(getById(movie))
    dispatch(setOpen(true))
  }
  return (
    <div className='w-48' onClick={handleOpen}>
      <img src={ posterPath ? `${Banner_Url}/${posterPath}` : "/assests/images/moviePoster.jpeg"} alt={movie.original_title} />
    </div>
  )
}

export default MovieCard
