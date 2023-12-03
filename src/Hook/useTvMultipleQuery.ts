import { useQuery } from "react-query";
import {
  getAiringTv,
  getLatestTv,
  getPopularTv,
  getTopRatedTv,
} from "../Components/api";

export const useTvMultipleQuery = () => {
  const latest = useQuery(["latestTv"], getLatestTv);
  const airing = useQuery(["airingTv"], getAiringTv);
  const popular = useQuery(["popularTv"], getPopularTv);
  const topRated = useQuery(["topRatedTv"], getTopRatedTv);
  return [latest, airing, popular, topRated];
};
