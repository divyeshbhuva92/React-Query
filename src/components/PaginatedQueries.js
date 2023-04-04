import axios from "axios";
import { useQuery } from "react-query";
import { useState } from "react";

export default function PaginatedQueries() {
  const [pageNum, setPageNum] = useState(1);

  const fetchColors = (pageNum) => {
    return axios.get(`http://localhost:4000/colors?_limit=3&_page=${pageNum}`);
  };

  const { isLoading, isError, error, data } = useQuery(
    ["colors", pageNum],
    () => fetchColors(pageNum)
  );

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <div>
      <h4>Paginated Queries</h4>
      <div>
        {data?.data.map((color) => {
          return (
            <div key={color.id}>
              {color.id} - {color.label}
            </div>
          );
        })}
      </div>

      <div>
        <button
          onClick={() => setPageNum((page) => page - 1)}
          disabled={pageNum === 1}
        >
          Prev
        </button>
        <button
          onClick={() => setPageNum((page) => page + 1)}
          disabled={pageNum === 3}
        >
          Next
        </button>
      </div>
    </div>
  );
}
