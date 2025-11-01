import { useNavigate } from "react-router-dom";
import type { CityWeather } from "../types";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { removeCity } from "../store/slices/weatherSlice";
import {
  toggleFavorite,
  selectIsFavorite,
} from "../store/slices/favoritesSlice";
import { formatTemperature } from "../utils/helpers";

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

  return (
    <div
      className="card cursor-pointer relative group"
      onClick={handleCardClick}
    >
      {/* Favorite Badge */}
      {isFavorite && (
        <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
          ★ Favorite
        </div>
      )}

      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{city.name}</h3>
          <p className="text-sm text-gray-500">{city.country}</p>
        </div>

        {city.conditionIcon && (
          <img
            src={city.conditionIcon}
            alt={city.condition}
            className="w-12 h-12"
          />
        )}
      </div>

      <div className="mb-4">
        <div className="text-4xl font-bold text-primary-600">
          {formatTemperature(city.temperature)}
        </div>
        <p className="text-gray-600 text-sm mt-1">{city.condition}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
        <div>
          <p className="text-gray-500">Feels like</p>
          <p className="font-semibold text-gray-700">
            {formatTemperature(city.feelsLike)}
          </p>
        </div>
        <div>
          <p className="text-gray-500">Humidity</p>
          <p className="font-semibold text-gray-700">{city.humidity}%</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 pt-4 border-t">
        <button
          onClick={handleFavoriteClick}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
            isFavorite
              ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {isFavorite ? "★ Favorited" : "☆ Favorite"}
        </button>

        {showRemove && (
          <button
            onClick={handleRemoveClick}
            className="py-2 px-4 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 font-medium transition-colors"
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
};

export default CityCard;
