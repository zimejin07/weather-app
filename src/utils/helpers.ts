import type { CityWeather } from "../types";
import { CACHE_DURATION } from "./constants";

/**
 * Generate a unique ID for a city based on name and country
 */
export const generateCityId = (name: string, country: string): string => {
  return `${name.toLowerCase().replace(/\s+/g, "-")}_${country
    .toLowerCase()
    .replace(/\s+/g, "-")}`;
};

/**
 * Check if cached data is still valid
 */
export const isCacheValid = (timestamp: number): boolean => {
  return Date.now() - timestamp < CACHE_DURATION;
};

/**
 * Sort cities with favorites at the top, then alphabetically
 */
export const sortCities = (
  cities: CityWeather[],
  favoriteIds: string[]
): CityWeather[] => {
  const favorites = cities
    .filter((city) => favoriteIds.includes(city.id))
    .sort((a, b) => a.name.localeCompare(b.name));

  const nonFavorites = cities
    .filter((city) => !favoriteIds.includes(city.id))
    .sort((a, b) => a.name.localeCompare(b.name));

  return [...favorites, ...nonFavorites];
};

/**
 * Format temperature with unit
 */
export const formatTemperature = (
  temp: number,
  unit: "C" | "F" = "C"
): string => {
  return `${Math.round(temp)}°${unit}`;
};

/**
 * Format date to readable string
 */
export const formatDate = (timestamp: number): string => {
  return new Date(timestamp).toLocaleString();
};

/**
 * Debounce function for search input
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Check if the app is online
 */
export const isOnline = (): boolean => {
  return navigator.onLine;
};
