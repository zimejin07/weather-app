import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  selectCityById,
  refreshCityWeather,
} from "../store/slices/weatherSlice";
import {
  selectIsFavorite,
  toggleFavorite,
} from "../store/slices/favoritesSlice";
import {
  selectNoteForCity,
  saveNote,
  deleteNote,
} from "../store/slices/notesSlice";
import { formatTemperature, formatDate, isOnline } from "../utils/helpers";

const CityDetailsPage = () => {
  const { cityId } = useParams<{ cityId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const city = useAppSelector((state) => selectCityById(state, cityId!));
  const isFavorite = useAppSelector((state) =>
    selectIsFavorite(state, cityId!)
  );
  const savedNote = useAppSelector((state) =>
    selectNoteForCity(state, cityId!)
  );

  const [note, setNote] = useState(savedNote);
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setNote(savedNote);
  }, [savedNote]);

  if (!city) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          City not found
        </h2>
        <button onClick={() => navigate("/")} className="btn-primary">
          Back to Home
        </button>
      </div>
    );
  }

  const handleSaveNote = () => {
    dispatch(saveNote({ cityId: city.id, note }));
    setIsEditingNote(false);
  };

  const handleDeleteNote = () => {
    if (confirm("Delete this note?")) {
      dispatch(deleteNote(city.id));
      setNote("");
      setIsEditingNote(false);
    }
  };

  const handleRefresh = async () => {
    if (!isOnline()) {
      alert("Cannot refresh while offline");
      return;
    }

    setRefreshing(true);
    try {
      await dispatch(refreshCityWeather(city.id)).unwrap();
    } catch (error) {
      alert("Failed to refresh weather data");
    } finally {
      setRefreshing(false);
    }
  };

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(city.id));
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Cities
      </button>

      {/* City Header */}
      <div className="bg-white rounded-xl shadow-md p-8 mb-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              {city.name}
            </h1>
            <p className="text-xl text-gray-600">{city.country}</p>
          </div>
          {city.conditionIcon && (
            <img
              src={city.conditionIcon}
              alt={city.condition}
              className="w-20 h-20"
            />
          )}
        </div>

        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-6xl font-bold text-primary-600">
              {formatTemperature(city.temperature)}
            </div>
            <p className="text-xl text-gray-600 mt-2">{city.condition}</p>
            <p className="text-sm text-gray-500 mt-1">
              Last updated: {formatDate(city.lastUpdated)}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleToggleFavorite}
            className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors ${
              isFavorite
                ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {isFavorite ? "★ Favorited" : "☆ Add to Favorites"}
          </button>
          <button
            onClick={handleRefresh}
            disabled={refreshing || !isOnline()}
            className="btn-secondary flex items-center"
          >
            <svg
              className={`w-5 h-5 mr-2 ${refreshing ? "animate-spin" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Refresh
          </button>
        </div>
      </div>

      {/* Weather Details Grid */}
      <div className="bg-white rounded-xl shadow-md p-8 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Weather Details
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div>
            <p className="text-gray-500 text-sm mb-1">Feels Like</p>
            <p className="text-2xl font-bold text-gray-800">
              {formatTemperature(city.feelsLike)}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-sm mb-1">Humidity</p>
            <p className="text-2xl font-bold text-gray-800">{city.humidity}%</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm mb-1">Wind Speed</p>
            <p className="text-2xl font-bold text-gray-800">
              {city.windSpeed} km/h
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-sm mb-1">Pressure</p>
            <p className="text-2xl font-bold text-gray-800">
              {city.pressure} mb
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-sm mb-1">Visibility</p>
            <p className="text-2xl font-bold text-gray-800">
              {city.visibility} km
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-sm mb-1">Cloud Cover</p>
            <p className="text-2xl font-bold text-gray-800">
              {city.cloudCover}%
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-sm mb-1">UV Index</p>
            <p className="text-2xl font-bold text-gray-800">{city.uvIndex}</p>
          </div>
        </div>
      </div>

      {/* Notes Section */}
      <div className="bg-white rounded-xl shadow-md p-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Weather Notes</h2>
          {savedNote && !isEditingNote && (
            <button
              onClick={() => setIsEditingNote(true)}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Edit
            </button>
          )}
        </div>

        {isEditingNote || !savedNote ? (
          <div>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add notes about the weather conditions..."
              className="input-field min-h-32 resize-y"
            />
            <div className="flex gap-3 mt-4">
              <button onClick={handleSaveNote} className="btn-primary">
                Save Note
              </button>
              {savedNote && (
                <>
                  <button
                    onClick={() => {
                      setNote(savedNote);
                      setIsEditingNote(false);
                    }}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteNote}
                    className="btn-secondary text-red-600"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-700 whitespace-pre-wrap">{savedNote}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CityDetailsPage;
