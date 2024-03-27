import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name: "Movie",
    initialState:{
        nowPlayingMovies:null,
        popularMovies:null,
        topRatedMovies: null,
        toggle:false,
        movieTrailer: null,
        open: false,
        movie: null
    },
    reducers:{
        getNowPlayingMovies:(state, action) => {
            state.nowPlayingMovies = action.payload
        },
        getPopularMovies:(state, action) => {
            state.popularMovies = action.payload
        },
        getTopRatedMovies:(state, action) => {
            state.topRatedMovies = action.payload
        },
        getUpcomingMovies:(state, action) => {
            state.upcomingMovies = action.payload
        },
        setToggle:(state) => {
            state.toggle = !state.toggle;
        },
        getMovieTrailer:(state, action) => {
            state.movieTrailer = action.payload
        },
        setOpen:(state, action) => {
            state.open = action.payload
        },
        getById:(state, action) => {
            state.movie=action.payload
        }
    }
});

export const {getNowPlayingMovies, getPopularMovies, getTopRatedMovies, getUpcomingMovies, setToggle, getMovieTrailer, setOpen, getById} = movieSlice.actions;
export default movieSlice.reducer;