import { request } from "../axios-utils";
import { useMutation, useQuery, useQueryClient } from "react-query";

const fetchSuperHeroes = () => {
  return request({ url: "/superheroes" });
};

const addsuperHero = (hero) => {
  return request({ url: "/superheroes", method: "POST", data: hero });
};

export const useSuperHeroesData = (heroId) => {
  const queryClient = useQueryClient();

  return useQuery("super-heroes", fetchSuperHeroes, {
    initialData: () => {
      const hero = queryClient
        .getQueriesData("super-heroes")
        ?.data?.find((hero) => hero.id === parseInt(heroId));

      if (hero) {
        return { data: hero };
      } else {
        return undefined;
      }
    },
    refetchIntervalInBackground: true,
  });
};

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();
  return useMutation(addsuperHero, {
    // onSuccess: (data) => {
    //   // queryClient.invalidateQueries("super-heroes");
    //   queryClient.setQueriesData("super-heroes", (oldQueryData) => {
    //     return {
    //       ...oldQueryData,
    //       data: [...oldQueryData.data, data.data],
    //     };
    //   });
    // },
    onMutate: async (newHero) => {
      await queryClient.cancelQueries("super-heroes");

      const prevHeroData = queryClient.getQueriesData("super-heroes");
      queryClient.setQueriesData("super-heroes", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            { id: oldQueryData?.data?.length + 1, ...newHero },
          ],
        };
      });
      return { prevHeroData };
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueriesData("super-heroes", context.prevHeroData);
    },
    onSettled: () => {
      queryClient.invalidateQueries("super-heroes");
    },
  });
};
