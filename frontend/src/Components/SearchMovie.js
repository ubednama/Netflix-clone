import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Search_Movies, options } from "../utils/constant";
import { setSearchMovieDetails } from "../redux/searchSlice";
import BeatLoader from "react-spinners/BeatLoader";
import { setLoading } from "../redux/userSlice";
import MovieList from "./MovieList";

const SearchMovie = () => {
  const [searchMovie, setSearchMovie] = useState("");
  const [buttonValue, setButtonValue] = useState("Search")
  const dispatch = useDispatch();
  let isLoading = useSelector(store=>store.app.isLoading);
  const searchResults = useSelector(store=>store.searchMovie)

  let adult = "false";
  let lang = "en-US";
  let page = '1';

  const submitHandler = async (e)=>{
    dispatch(setLoading(true))
    e.preventDefault();

    try {
      if (buttonValue === 'Search' && searchMovie.trim() !== "" ) {
          // console.log("search")
          const res = await axios.get(`${Search_Movies}${searchMovie}&include_adult=${adult}&language=${lang}&page=${page}`, options);
          // console.log("from search Movie",res.data.results);
          const movies = res?.data?.results;
          dispatch(setSearchMovieDetails({searchMovie, movies}))
          setButtonValue('Clear')
        } else {
          // console.log("sclear")
          setSearchMovie("");
          setButtonValue('Search');
      }
    } catch (error) {
      console.log("Error from searchMovie ", error)
    } finally {
      dispatch(setLoading(false));
    }
  }

  isLoading = false

  // console.log("from searchMovie ",searchMovie)
  return (
    <div className="flex flex-col justify-center h-[100%] pt-[10%]">
      <form onSubmit={submitHandler} className="w-[50%] flex self-center justify-between shadow-md border-2 border-gray-200 rounded-lg ">
        <input value={searchMovie} onChange={(e)=>{setSearchMovie(e.target.value)}} type="text" placeholder="Search here" className="w-full outline-none rounded-md text-lg p-2" required/>
        <button  className="bg-[#D81F26] px-12 rounded-lg text-white w-[30%]">{isLoading ? <BeatLoader color="#D81F26" size={12} margin={3} /> :  buttonValue}</button>
      </form>
      <div className="p-4">
        {
          buttonValue === "Clear" && searchResults.searchedMovie.length>0 ?
            <MovieList title={searchResults.movieName} movies={searchResults.searchedMovie}/> : <h1>No Results Found!!</h1>
        }
      </div>
    </div>
  )
}

export default SearchMovie
