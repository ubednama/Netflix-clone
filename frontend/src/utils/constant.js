// export const API_END_POINT = "http://localhost:8080/api/v1/user"
export const API_END_POINT = 'https://netflix-clone-gezd.onrender.com/api/v1/user'

export const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: process.env.AUTH
    }
};

export const Now_Playing_Movies = "https://api.themoviedb.org/3/movie/now_playing"

export const Popular_Movies = "https://api.themoviedb.org/3/movie/popular"

export const Top_Rated_Movies = "https://api.themoviedb.org/3/movie/top_rated"

export const Upcoming_Movies = "https://api.themoviedb.org/3/movie/upcoming";

export const Search_Movies = "https://api.themoviedb.org/3/search/movie?query="

export const Banner_Url = "https://image.tmdb.org/t/p/w500";