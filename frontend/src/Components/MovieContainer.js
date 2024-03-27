import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const MovieContainer = () => {

  const movie = useSelector(store => store.movie)
  // if (movie.popularMovies === null || movie.nowPlayingMovies === null || movie.upcomingMovies === null || movie.topRatedMovies === null ) {
  //   return <div>Loading...</div>; // or some other loading indicator
  // }
  // const nowPlayingMovies = movie ? movie.nowPlayingMovies : [];


  return (
    <div className='bg-black text-white'>
      <div className='-mt-80 relative z-40'>
        <MovieList title={"Now Playing"} movies={movie.nowPlayingMovies} />
        <MovieList title={"Upcoming Movies"} movies={movie.upcomingMovies} />
        <MovieList title={"Popular Movies"} movies={movie.popularMovies} />
        <MovieList title={"Top Rated"} movies={movie.topRatedMovies} />
      </div>
    </div>
  )
}

export default MovieContainer
