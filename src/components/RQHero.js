import { useParams } from "react-router-dom";
import useHeroData from "../hooks/useHeroData";

export default function RQHero() {
  const { heroId } = useParams();

  const { isLoading, data, isError, error } = useHeroData(heroId);

  if (isLoading) {
    return <h4>Loading...</h4>;
  }

  if (isError) {
    return <h5>{error.message}</h5>;
  }

  return (
    <div>
      {data && data.data.name} - {data.data.alterEgo}
    </div>
  );
}
