import { useMemo } from "react";
import { useAppSelector } from "../store/hooks";
import {
  selectAllCities,
  selectWeatherLoading,
} from "../store/slices/weatherSlice";
import { selectFavoriteIds } from "../store/slices/favoritesSlice";
import CityCard from "../components/CityCard";
import SearchBar from "../components/SearchBar";
import { sortCities } from "../utils/helpers";

const HomePage = () => {
  const cities = useAppSelector(selectAllCities);
  const favoriteIds = useAppSelector(selectFavoriteIds);
  const loading = useAppSelector(selectWeatherLoading);

  const sortedCities = useMemo(() => {
    return sortCities(cities, favoriteIds);
  }, [cities, favoriteIds]);

  const favoriteCities = sortedCities.filter((city) =>
    favoriteIds.includes(city.id)
  );
  const otherCities = sortedCities.filter(
    (city) => !favoriteIds.includes(city.id)
  );

  return (
    <div>
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Weather Around the World
        </h1>
        <p className="text-gray-600">
          Track weather conditions in cities worldwide
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <SearchBar />
      </div>

      {/* Loading State */}
      {loading && cities.length === 0 && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">Loading weather data...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && cities.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl shadow-md">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
            />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            No cities yet
          </h3>
          <p className="mt-2 text-gray-600">Search for a city to get started</p>
        </div>
      )}

      {/* Favorite Cities Section */}
      {favoriteCities.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="text-yellow-500 mr-2">★</span>
            Favorite Cities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteCities.map((city) => (
              <CityCard key={city.id} city={city} />
            ))}
          </div>
        </div>
      )}

      {/* Other Cities Section */}
      {otherCities.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {favoriteCities.length > 0 ? "Other Cities" : "All Cities"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherCities.map((city) => (
              <CityCard key={city.id} city={city} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
