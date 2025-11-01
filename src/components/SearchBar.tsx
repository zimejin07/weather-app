import { useState, useCallback, useEffect } from "react";
import { useAppDispatch } from "../store/hooks";
import { fetchCityWeather } from "../store/slices/weatherSlice";
import { geoAPI } from "../services/geoAPI";
import { debounce, isOnline } from "../utils/helpers";

const SearchBar = () => {
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<
    Array<{ name: string; country: string }>
  >([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const online = isOnline();

  // Debounced search function
  const searchCities = useCallback(
    debounce(async (searchQuery: string) => {
      if (!searchQuery || searchQuery.length < 2) {
        setSuggestions([]);
        return;
      }

      setLoading(true);
      try {
        const results = await geoAPI.searchCities(searchQuery);
        setSuggestions(results);
      } catch (error) {
        console.error("Search failed:", error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 300),
    []
  );

  useEffect(() => {
    if (online && query) {
      searchCities(query);
    } else {
      setSuggestions([]);
    }
  }, [query, searchCities, online]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setShowSuggestions(true);
  };

  const handleCitySelect = async (cityName: string) => {
    setQuery("");
    setSuggestions([]);
    setShowSuggestions(false);

    try {
      await dispatch(fetchCityWeather(cityName)).unwrap();
    } catch (error) {
      alert("Failed to fetch weather data for this city");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      handleCitySelect(query.trim());
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={() => setShowSuggestions(true)}
            placeholder={
              online ? "Search for a city..." : "Search unavailable offline"
            }
            disabled={!online}
            className="input-field pr-10"
          />
          <svg
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </form>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg border max-h-64 overflow-y-auto">
          {loading && (
            <div className="px-4 py-3 text-sm text-gray-500">Searching...</div>
          )}
          {suggestions.map((city, index) => (
            <button
              key={`${city.name}-${city.country}-${index}`}
              onClick={() => handleCitySelect(city.name)}
              className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors border-b last:border-b-0"
            >
              <div className="font-medium text-gray-800">{city.name}</div>
              <div className="text-sm text-gray-500">{city.country}</div>
            </button>
          ))}
        </div>
      )}

      {/* Click outside to close */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setShowSuggestions(false)}
        />
      )}
    </div>
  );
};

export default SearchBar;
