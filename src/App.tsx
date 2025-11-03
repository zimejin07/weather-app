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
import { isOnline } from "./utils/helpers";

function App() {
  const dispatch = useAppDispatch();
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    dispatch(loadCachedData());
    dispatch(loadFavorites());
    dispatch(loadNotes());
    dispatch(loadUserLocation());

    const lastSync = localStorage.getItem("last_sync");
    const cacheAge = lastSync ? Date.now() - parseInt(lastSync) : Infinity;
    const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

    if (isOnline() && cacheAge > CACHE_DURATION) {
      const cachedCities = localStorage.getItem("weather_cache");
      const hasCities = cachedCities && JSON.parse(cachedCities);

      if (!hasCities || Object.keys(hasCities).length === 0) {
        dispatch(fetchDefaultCities());
      }
    }
  }, [dispatch]);

  useEffect(() => {
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
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {!online && (
        <div className="bg-yellow-500 text-white px-4 py-2 text-center text-sm font-medium">
          You are currently offline. Some features may be limited.
        </div>
      )}

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <Outlet />
      </main>

      <footer className="bg-white border-t mt-12 py-6">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p>
            Weather App &copy; {new Date().getFullYear()} | Built with React &
            TypeScript
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
