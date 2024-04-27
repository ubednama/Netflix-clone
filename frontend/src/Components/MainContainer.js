import React from 'react'
import VideoTitle from './VideoTitle.js'
import VideoBackground from './VideoBackground.js'
import { useSelector } from 'react-redux'

const MainContainer = () => {
  const movie = useSelector(store => store.movie?.nowPlayingMovies);

  if (!movie) return;    //early return
  // console.log(movie)

  const { overview, id, title } = movie[1];
  // console.log("from main container ",id) 

  return (
    <div className='relative'>
      <VideoBackground movieId={id} />
      <div className='absolute top-[55%] w-[100%]'>
        <VideoTitle title={title} overview={overview} />
      </div>
    </div>
  )
}

export default MainContainer
