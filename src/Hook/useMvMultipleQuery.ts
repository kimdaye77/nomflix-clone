import { useQuery } from "react-query";
import {
  getLatestMv,
  getMovies,
  getTopRatedMv,
  getUpComingMv,
} from "../Components/api";

export const useMvMultipleQuery = () => {
  const latest = useQuery(["latestMv"], getLatestMv);
  const nowPlaying = useQuery(["nowPlayingMv"], getMovies);
  const topRated = useQuery(["topRatedMv"], getTopRatedMv);
  const upComing = useQuery(["upComingMv"], getUpComingMv);
  return [latest, nowPlaying, topRated, upComing];
};
