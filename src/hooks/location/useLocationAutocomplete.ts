import useSWR from "swr";

import { LocationSuggestion, QueryLocationAutocompleteOptions } from "@/types";
import api from "../../lib/api";

type State = {
  isLoading: boolean;
  locations?: LocationSuggestion[];
  error?: Error;
};

function useLocationAutocomplete(
  queryOptions: QueryLocationAutocompleteOptions,
): State {
  const fetcher = queryOptions.search?.trim() ? api.get : null;

  const { data, error } = useSWR<any, Error>(
    api.createLocationAutocompleteUrl(queryOptions),
    fetcher,
  );

  return { error, locations: data, isLoading: !error && !data };
}

export default useLocationAutocomplete;
