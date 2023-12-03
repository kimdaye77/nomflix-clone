import { useQuery } from "react-query";
import { getLatestMv, getTopRatedMv, getUpComingMv } from "../Components/api";

export const useMvMultipleQuery = () => {
  const latest = useQuery(["latestMv"], getLatestMv);
  const topRated = useQuery(["topRatedMv"], getTopRatedMv);
  const upComing = useQuery(["upComingMv"], getUpComingMv);
  return [latest, topRated, upComing];
};
