import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch } from "./store/hooks";
import {
  loadCachedData,
  fetchDefaultCities,
} from "./store/slices/weatherSlice";
import { loadFavorites } from "./store/slices/favoritesSlice";
import { loadNotes } from "./store/slices/notesSlice";
import { loadUserLocation } from "./store/slices/userLocationSlice";
import Navbar from "./components/Navbar";
import WeatherBackground from "./components/WeatherBackground";
import { isOnline } from "./utils/helpers";

function App() {
  const dispatch = useAppDispatch();
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    // Load cached data from localStorage
    dispatch(loadCachedData());
    dispatch(loadFavorites());
    dispatch(loadNotes());
    dispatch(loadUserLocation());

    // Only fetch fresh data if cache is old or empty
    const lastSync = localStorage.getItem("last_sync");
    const cacheAge = lastSync ? Date.now() - parseInt(lastSync) : Infinity;
    const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

    // Only fetch if online AND (no cache OR cache is old)
    if (isOnline() && cacheAge > CACHE_DURATION) {
      const cachedCities = localStorage.getItem("weather_cache");
      const hasCities = cachedCities && JSON.parse(cachedCities);

      // Only fetch if we have no cached cities
      if (!hasCities || Object.keys(hasCities).length === 0) {
        dispatch(fetchDefaultCities());
      }
    }
  }, [dispatch]);

  useEffect(() => {
    // Listen for online/offline events
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Animated weather background */}
      <WeatherBackground />

      {/* Main content */}
      <div className="relative z-10">
        <Navbar />

        {!online && (
          <div className="bg-yellow-500 text-white px-4 py-2 text-center text-sm font-medium">
            You are currently offline. Some features may be limited.
          </div>
        )}

        <main className="container mx-auto px-4 py-8 max-w-7xl">
          <Outlet />
        </main>

        <footer className="bg-white/80 backdrop-blur-sm border-t mt-12 py-6">
          <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
            <p>
              Weather App &copy; {new Date().getFullYear()} | Built with React &
              TypeScript
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
