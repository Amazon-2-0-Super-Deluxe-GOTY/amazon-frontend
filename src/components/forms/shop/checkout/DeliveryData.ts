import { skipToken, useQuery } from "@tanstack/react-query";

interface IDeliveryData {
  id: number;
  name: string;
  iso2: string;
}

export function GetCountryData() {
  const countryQuery = useQuery<IDeliveryData[]>({
    queryKey: ["countries"],
    queryFn: async () => {
      return await fetch("/api/countries").then((res) => res.json());
    },
    refetchOnWindowFocus: false,
  });

  const res = {
    data: countryQuery.data,
    isLoading: countryQuery.isLoading,
  };

  return res;
}

export function GetStateData(stateIso2: string) {
  const stateQuery = useQuery<IDeliveryData[]>({
    queryKey: ["states", stateIso2],
    queryFn: stateIso2
      ? async () => {
          return await fetch(`/api/states?ciso=${stateIso2}`).then((res) =>
            res.json()
          );
        }
      : skipToken,
    refetchOnWindowFocus: false,
  });

  const res = {
    data: stateQuery.data,
    isLoading: stateQuery.isLoading,
  };

  return res;
}

export function GetCityData(countryIso2: string, stateIso2: string) {
  const cityQuery = useQuery<IDeliveryData[]>({
    queryKey: ["cities", countryIso2, stateIso2],
    queryFn:
      countryIso2 && stateIso2
        ? async () => {
            return await fetch(
              `/api/cities?ciso=${countryIso2}&siso=${stateIso2}`
            ).then((res) => res.json());
          }
        : skipToken,
    refetchOnWindowFocus: false,
  });

  const res = {
    data: cityQuery.data,
    isLoading: cityQuery.isLoading,
  };

  return res;
}
