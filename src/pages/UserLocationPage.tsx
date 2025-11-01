import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  fetchUserLocation,
  selectUserLocation,
  selectLocationPermission,
  selectLocationLoading,
  selectLocationError,
} from "../store/slices/userLocationSlice";
import { formatTemperature, formatDate } from "../utils/helpers";

const UserLocationPage = () => {
  const dispatch = useAppDispatch();
  const location = useAppSelector(selectUserLocation);
  const permissionGranted = useAppSelector(selectLocationPermission);
  const loading = useAppSelector(selectLocationLoading);
  const error = useAppSelector(selectLocationError);

  const handleRequestLocation = () => {
    dispatch(fetchUserLocation());
  };

  // Permission not yet requested
  if (permissionGranted === null && !loading) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <div className="mb-6">
            <svg
              className="mx-auto h-16 w-16 text-primary-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Get Your Local Weather
          </h1>
          <p className="text-gray-600 mb-8">
            Allow location access to see detailed weather information for your
            current location
          </p>
          <button
            onClick={handleRequestLocation}
            className="btn-primary text-lg"
          >
            Allow Location Access
          </button>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        <p className="mt-4 text-gray-600">Getting your location...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
          <svg
            className="mx-auto h-12 w-12 text-red-600 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Location Access Denied
          </h2>
          <p className="text-gray-600 mb-6">
            {error ||
              "Unable to access your location. Please check your browser settings."}
          </p>
          <button onClick={handleRequestLocation} className="btn-primary">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Success state with location data
  if (location) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Your Local Weather
          </h1>
          <p className="text-gray-600">
            Current weather conditions at your location
          </p>
        </div>

        {/* Weather Card */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-2">
                {location.name}
              </h2>
              <p className="text-xl text-gray-600">{location.country}</p>
            </div>
            {location.conditionIcon && (
              <img
                src={location.conditionIcon}
                alt={location.condition}
                className="w-20 h-20"
              />
            )}
          </div>

          <div className="mb-6">
            <div className="text-6xl font-bold text-primary-600">
              {formatTemperature(location.temperature)}
            </div>
            <p className="text-xl text-gray-600 mt-2">{location.condition}</p>
            <p className="text-sm text-gray-500 mt-1">
              Last updated: {formatDate(location.lastUpdated)}
            </p>
          </div>

          <button onClick={handleRequestLocation} className="btn-secondary">
            Refresh Location
          </button>
        </div>

        {/* Weather Details */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            Detailed Information
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div>
              <p className="text-gray-500 text-sm mb-1">Feels Like</p>
              <p className="text-2xl font-bold text-gray-800">
                {formatTemperature(location.feelsLike)}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-sm mb-1">Humidity</p>
              <p className="text-2xl font-bold text-gray-800">
                {location.humidity}%
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-sm mb-1">Wind Speed</p>
              <p className="text-2xl font-bold text-gray-800">
                {location.windSpeed} km/h
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-sm mb-1">Pressure</p>
              <p className="text-2xl font-bold text-gray-800">
                {location.pressure} mb
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-sm mb-1">Visibility</p>
              <p className="text-2xl font-bold text-gray-800">
                {location.visibility} km
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-sm mb-1">Cloud Cover</p>
              <p className="text-2xl font-bold text-gray-800">
                {location.cloudCover}%
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-sm mb-1">UV Index</p>
              <p className="text-2xl font-bold text-gray-800">
                {location.uvIndex}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default UserLocationPage;
