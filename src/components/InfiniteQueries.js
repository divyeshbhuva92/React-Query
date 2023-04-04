import axios from "axios";
import { Fragment } from "react";
import { useInfiniteQuery } from "react-query";

export default function InfiniteQueries() {
  const fetchColors = ({ pageParam = 1 }) => {
    return axios.get(
      `http://localhost:4000/colors?_limit=3&_page=${pageParam}`
    );
  };

  const {
    isLoading,
    isError,
    error,
    data,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(["colors"], fetchColors, {
    getNextPageParam: (_lastPage, pages) => {
      if (pages.length < 3) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
  });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <div>
      <h4>Infinite Queries</h4>
      <div>
        {data?.pages.map((group, idx) => {
          return (
            <Fragment key={idx}>
              {group.data.map((color) => (
                <div key={color.id}>
                  {color.id} - {color.label}
                </div>
              ))}
            </Fragment>
          );
        })}
      </div>
      <button disabled={!hasNextPage} onClick={fetchNextPage}>
        Load more
      </button>
      <div>{isFetching && !isFetchingNextPage ? "Loading..." : null}</div>
    </div>
  );
}
