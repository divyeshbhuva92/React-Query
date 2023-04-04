import axios from "axios";
import { useQuery } from "react-query";

function fetchHero({ queryKey }) {
  const heroID = queryKey[1];
  return axios.get(`http://localhost:4000/superheroes/${heroID}`);
}
export default function useHeroData(heroID) {
  return useQuery(["super-hero", heroID], fetchHero);
}
