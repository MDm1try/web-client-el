/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import classcat from "classcat";
import { ChangeEvent, useState } from "react";

import useLocationAutocomplete from "@/hooks/location/useLocationAutocomplete";
import { LocationSuggestion } from "@/types";

function LocationAutocomplete() {
  const [search, setSearch] = useState<string>(``);
  const [isAutocompleteShown, setIsAutocompleteShown] = useState(false);

  const {
    isLoading,
    locations,
    error: locationError,
  } = useLocationAutocomplete({ search });

  const handleChangeLocation = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearch(value);
    setIsAutocompleteShown(Boolean(value.trim()));
  };
  const handleSelectLocation = (location: LocationSuggestion) => () => {
    setSearch(`${location.name}, ${location.regionName}, ${location.coutry}`);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {};

  return (
    <div className="position-relative w-100 ms-md-3">
      <input
        id="location"
        className="form-control"
        type="text"
        value={search}
        placeholder="Название города"
        onChange={handleChangeLocation}
        onKeyDown={handleKeyDown}
        autoComplete="off"
      />
      <ul
        className={classcat([
          `dropdown-menu w-100`,
          {
            show: isAutocompleteShown,
          },
        ])}
      >
        {locations?.map((location) => (
          <li
            key={location.id}
            className="dropdown-item"
            onClick={handleSelectLocation(location)}
          >
            {location.name}, {location.regionName}, {location.coutry}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LocationAutocomplete;
