import axios from "axios";
import { useEffect, useState } from "react";

function SuperHeroesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let dataAxios = axios.get("http://localhost:4000/superheroes");
    dataAxios
      .then((res) => {
        // console.log(res.data);
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <h4>Loading...</h4>;
  }
  if (error) {
    return <p>{error}</p>;
  }
  return (
    <div>
      <h3>Super Heroes</h3>
      {data.map((hero) => {
        return <div key={hero.name}>{hero.name}</div>;
      })}
    </div>
  );
}

export default SuperHeroesPage;
