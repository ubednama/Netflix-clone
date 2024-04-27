import axios from "axios"
import { options } from "../utils/constant";
import { getMovieTrailer } from "../redux/movieSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const useMovieById = async (movieId) => {
  const dispatch = useDispatch();
  
  useEffect(()=>{
    const getMovieById = async() => {
      try {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos`, options);
        // console.log("from useMovieId ",res.data.results)
        const trailer = res?.data?.results?.filter((item)=>{
            return item.type === "Trailer"
        })
        dispatch(getMovieTrailer(trailer.length > 0 ? trailer[0] : res.data.results[0]))
        // console.log("trailer",trailer)
      } catch (error) {
        console.log("Error while fetching movie video: ",error)
      }
    }
    getMovieById([dispatch, movieId]);
  },[])
}

export default useMovieById