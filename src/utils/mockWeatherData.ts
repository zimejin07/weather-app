import type { CityWeather } from "../types";
import { generateCityId } from "./helpers";
import { DEFAULT_CITIES } from "./constants";

/**
 * Generate mock weather data for development
 * Use this when you've exhausted your API quota
 */
export const generateMockWeatherData = (): Record<string, CityWeather> => {
  const mockCities: Record<string, CityWeather> = {};

  DEFAULT_CITIES.forEach((city, index) => {
    const id = generateCityId(city.name, city.country);

    mockCities[id] = {
      id,
      name: city.name,
      country: city.country,
      temperature: Math.floor(Math.random() * 30) + 10, // 10-40°C
      feelsLike: Math.floor(Math.random() * 30) + 10,
      condition: ["Sunny", "Partly cloudy", "Cloudy", "Rainy", "Clear"][
        Math.floor(Math.random() * 5)
      ],
      conditionIcon:
        "https://cdn.weatherstack.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png",
      humidity: Math.floor(Math.random() * 40) + 40, // 40-80%
      windSpeed: Math.floor(Math.random() * 20) + 5, // 5-25 km/h
      pressure: Math.floor(Math.random() * 30) + 1000, // 1000-1030 mb
      visibility: Math.floor(Math.random() * 10) + 5, // 5-15 km
      cloudCover: Math.floor(Math.random() * 100), // 0-100%
      uvIndex: Math.floor(Math.random() * 11), // 0-10
      lastUpdated: Date.now(),
    };
  });

  return mockCities;
};

/**
 * Check if we should use mock data
 * Set VITE_USE_MOCK_DATA=true in .env to enable
 */
export const shouldUseMockData = (): boolean => {
  return import.meta.env.VITE_USE_MOCK_DATA === "true";
};
