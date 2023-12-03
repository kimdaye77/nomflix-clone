const API_KEY = "085fe6b31df156cbd8271e97691574a2";
const BASE_PATH = "https://api.themoviedb.org/3";

export interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  name: string;
  overview: string;
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export async function getMovies() {
  const response = await fetch(
    `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`
  );
  return await response.json();
}

export async function getMovieDetail(movie_id: number) {
  const response = await fetch(
    `${BASE_PATH}/movie/${movie_id}?language=en-US&api_key=${API_KEY}`
  );
  return await response.json();
}

export async function getLatestMv() {
  const response = await fetch(`${BASE_PATH}/movie/latest?api_key=${API_KEY}`);
  return await response.json();
}

export async function getTopRatedMv() {
  const response = await fetch(
    `${BASE_PATH}/movie/top_rated?api_key=${API_KEY}`
  );
  return await response.json();
}

export async function getUpComingMv() {
  const response = await fetch(
    `${BASE_PATH}/movie/upcoming?api_key=${API_KEY}`
  );
  return await response.json();
}

export async function getLatestTv() {
  const response = await fetch(`${BASE_PATH}/tv/latest?api_key=${API_KEY}`);
  return await response.json();
}

export async function getAiringTv() {
  const response = await fetch(
    `${BASE_PATH}/tv/airing_today?api_key=${API_KEY}`
  );
  return await response.json();
}

export async function getPopularTv() {
  const response = await fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}`);
  return await response.json();
}

export async function getTopRatedTv() {
  const response = await fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}`);
  return await response.json();
}

export async function getSearchMv(keyword: string) {
  const response = await fetch(
    `${BASE_PATH}/search/movie?api_key=${API_KEY}&query=${keyword}`
  );
  return await response.json();
}
export async function getSearchTv(keyword: string) {
  const response = await fetch(
    `${BASE_PATH}/search/tv?api_key=${API_KEY}&query=${keyword}`
  );
  return await response.json();
}
