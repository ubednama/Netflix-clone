import React from 'react'
import MovieCard from './MovieCard'

const MovieList = ({title, movies}) => {

  if (!movies) {
    return null; // or return some placeholder content or loading indicator
  }

  return (
    <div className='px-8'>
      <h1 className='text-3xl pb-2 pt-3'>{title}</h1>
      <div className='flex overflow-x-scroll cursor-pointer scroll-smooth'>
        <div className='flex items-center gap-2 text-white' >
            { 
              movies?.map((movie)=>{
                return (
                  <MovieCard key={movie.id} movie={movie} posterPath={movie.poster_path}/>
                )
              })
            }
        </div>
      </div>
    </div>
  )
}

export default MovieList