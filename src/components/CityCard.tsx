import { useNavigate } from "react-router-dom";
import type { CityWeather } from "../types";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { removeCity } from "../store/slices/weatherSlice";
import {
  toggleFavorite,
  selectIsFavorite,
} from "../store/slices/favoritesSlice";
import { formatTemperature } from "../utils/helpers";
import WeatherIcon from "./WeatherIcon";

interface CityCardProps {
  city: CityWeather;
  showRemove?: boolean;
}

const CityCard = ({ city, showRemove = true }: CityCardProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector((state) =>
    selectIsFavorite(state, city.id)
  );

  const handleCardClick = () => {
    navigate(`/city/${city.id}`);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleFavorite(city.id));
  };

  const handleRemoveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(`Remove ${city.name} from the list?`)) {
      dispatch(removeCity(city.id));
    }
  };

  // Get background gradient based on temperature
  const getTempGradient = (temp: number) => {
    if (temp >= 30) return "from-orange-50 to-red-50";
    if (temp >= 20) return "from-yellow-50 to-orange-50";
    if (temp >= 10) return "from-green-50 to-yellow-50";
    if (temp >= 0) return "from-blue-50 to-green-50";
    return "from-blue-100 to-blue-50";
  };

  return (
    <div
      className={`card cursor-pointer relative overflow-hidden bg-gradient-to-br ${getTempGradient(
        city.temperature
      )}`}
      onClick={handleCardClick}
    >
      {/* Favorite Badge */}
      {isFavorite && (
        <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1 z-10">
          <span className="text-base">⭐</span>
          <span>Favorite</span>
        </div>
      )}

      {/* Header with City Name */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-1">{city.name}</h3>
          <p className="text-sm text-gray-600 font-medium">{city.country}</p>
        </div>
      </div>

      {/* Weather Display */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex-1">
          <div className="text-5xl font-bold text-gray-800 mb-2">
            {formatTemperature(city.temperature)}
          </div>
          <p className="text-gray-700 font-medium capitalize">
            {city.condition}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Feels like {formatTemperature(city.feelsLike)}
          </p>
        </div>

        <div className="flex-shrink-0">
          <WeatherIcon condition={city.condition} size="lg" />
        </div>
      </div>

      {/* Weather Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-white/50 rounded-lg backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <span className="text-2xl">💧</span>
          <div>
            <p className="text-xs text-gray-600">Humidity</p>
            <p className="font-bold text-gray-800">{city.humidity}%</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl">💨</span>
          <div>
            <p className="text-xs text-gray-600">Wind</p>
            <p className="font-bold text-gray-800">{city.windSpeed} km/h</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={handleFavoriteClick}
          className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-all transform hover:scale-105 ${
            isFavorite
              ? "bg-yellow-400 text-yellow-900 hover:bg-yellow-500 shadow-md"
              : "bg-white/80 text-gray-700 hover:bg-white border border-gray-200"
          }`}
        >
          {isFavorite ? "⭐ Favorited" : "☆ Favorite"}
        </button>

        {showRemove && (
          <button
            onClick={handleRemoveClick}
            className="py-2.5 px-4 bg-white/80 text-red-600 rounded-lg hover:bg-red-50 font-medium transition-all transform hover:scale-105 border border-red-200"
          >
            🗑️
          </button>
        )}
      </div>
    </div>
  );
};

export default CityCard;
