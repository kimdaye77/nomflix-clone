import { useQuery } from "react-query";
import { getSearchMv, getSearchTv } from "../Components/api";

export const useSearch = (keyword: string) => {
  const mvResult = useQuery(["mvResult", keyword], () => getSearchMv(keyword));
  const tvResult = useQuery(["tvResult", keyword], () => getSearchTv(keyword));
  return [mvResult, tvResult];
};
