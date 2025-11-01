import type { CityWeather } from "../types";
import { STORAGE_KEYS } from "../utils/constants";

class StorageService {
  /**
   * Save weather data to localStorage
   */
  saveWeatherCache(cities: Record<string, CityWeather>): void {
    try {
      localStorage.setItem(STORAGE_KEYS.WEATHER_CACHE, JSON.stringify(cities));
      localStorage.setItem(STORAGE_KEYS.LAST_SYNC, Date.now().toString());
    } catch (error) {
      console.error("Failed to save weather cache:", error);
    }
  }

  /**
   * Load weather data from localStorage
   */
  loadWeatherCache(): Record<string, CityWeather> | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.WEATHER_CACHE);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Failed to load weather cache:", error);
      return null;
    }
  }

  /**
   * Save favorites to localStorage
   */
  saveFavorites(favoriteIds: string[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favoriteIds));
    } catch (error) {
      console.error("Failed to save favorites:", error);
    }
  }

  /**
   * Load favorites from localStorage
   */
  loadFavorites(): string[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Failed to load favorites:", error);
      return [];
    }
  }

  /**
   * Save notes to localStorage
   */
  saveNotes(notes: Record<string, string>): void {
    try {
      localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
    } catch (error) {
      console.error("Failed to save notes:", error);
    }
  }

  /**
   * Load notes from localStorage
   */
  loadNotes(): Record<string, string> {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.NOTES);
      return data ? JSON.parse(data) : {};
    } catch (error) {
      console.error("Failed to load notes:", error);
      return {};
    }
  }

  /**
   * Save user location to localStorage
   */
  saveUserLocation(location: CityWeather): void {
    try {
      localStorage.setItem(
        STORAGE_KEYS.USER_LOCATION,
        JSON.stringify(location)
      );
    } catch (error) {
      console.error("Failed to save user location:", error);
    }
  }

  /**
   * Load user location from localStorage
   */
  loadUserLocation(): CityWeather | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER_LOCATION);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Failed to load user location:", error);
      return null;
    }
  }

  /**
   * Get last sync timestamp
   */
  getLastSync(): number | null {
    try {
      const timestamp = localStorage.getItem(STORAGE_KEYS.LAST_SYNC);
      return timestamp ? parseInt(timestamp, 10) : null;
    } catch (error) {
      console.error("Failed to get last sync:", error);
      return null;
    }
  }

  /**
   * Clear all app data from localStorage
   */
  clearAll(): void {
    try {
      Object.values(STORAGE_KEYS).forEach((key) => {
        localStorage.removeItem(key);
      });
    } catch (error) {
      console.error("Failed to clear storage:", error);
    }
  }
}

export const storageService = new StorageService();
