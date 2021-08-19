import { useEffect } from "react";
import { useFetch } from "./useFetch.js";
import { mainUrls } from "./dataRoutes.js";

/**
     Fetch data from an open-source API. It returns json containing pagination.
     The json contains an `info` and a `results` property. The `info` contains every information about the pagination,
     the `results` contains the planets objects situated in the given page number in the pagination.
     *
     * @param pageNum integer that gives the pagination page number. The json `info` property contains how many pages are.
     */
export const usePlanets = (pageNum = 1) => {
  const [planets, setUrl] = useFetch(mainUrls.planets + pageNum);
  useEffect(() => {
    setUrl(mainUrls.planets + pageNum);
  }, [pageNum]);
  return planets === undefined ? "Loading..." : planets;
};

/**
     Fetch data from an open-source API. It returns json containing pagination.
     The json contains an `info` and a `results` property. The `info` contains every information about the pagination,
     the `results` contains the locations objects situated in the given page number in the pagination.
     *
     * @param pageNum integer that gives the pagination page number. The json `info` property contains how many pages are.
     */
// export const useLocations = (pageNum = 1) => {
//   const [locations, setUrl] = useFetch(mainUrls.locations + pageNum);
//   useEffect(() => {
//     setUrl(mainUrls.locations + pageNum);
//   }, [pageNum]);
//   return locations === undefined ? "Loading..." : locations;
// };
