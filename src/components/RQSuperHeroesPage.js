import { useState } from "react";
import {
  useSuperHeroesData,
  useAddSuperHeroData,
} from "../hooks/useSuperHeroesData";
import { Link } from "react-router-dom";

function RQSuperHeroesPage() {
  const [name, setName] = useState("");
  const [alterEgo, setAlterEgo] = useState("");

  const { isLoading, data, isError, error, isFetching } = useSuperHeroesData();

  const { mutate: addHero } = useAddSuperHeroData();

  if (isLoading || isFetching) {
    return <h4>Loading...</h4>;
  }

  if (isError) {
    return <h5>{error.message}</h5>;
  }

  const handleAddHero = () => {
    if (name !== "" && alterEgo !== "") {
      const hero = { name, alterEgo };
      addHero(hero);
      setName("");
      setAlterEgo("");
    } else {
      alert("");
    }
  };

  return (
    <div>
      <h3>RQ Super Heroes Page</h3>

      <div className="add-heroes">
        <label>
          Hero Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Real Name:
          <input
            type="text"
            value={alterEgo}
            onChange={(e) => setAlterEgo(e.target.value)}
          ></input>
        </label>
      </div>
      <button onClick={handleAddHero}>Add Hero</button>

      <div>
        {data &&
          data.data.map((hero) => {
            return (
              <div key={hero.name}>
                <Link to={`/rq-hero/${hero.id}`}>{hero.name}</Link>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default RQSuperHeroesPage;
