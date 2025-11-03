import axios from "axios";
import type { CityWeather, WeatherstackResponse } from "../types";
import { generateCityId } from "../utils/helpers";
import { API_CONFIG } from "../utils/constants";

const API_KEY = import.meta.env.VITE_WEATHERSTACK_API_KEY;

class WeatherAPIService {
  private baseURL = API_CONFIG.WEATHERSTACK_BASE_URL;

  /**
   * Transform API response to our CityWeather format
   */
  private transformResponse(data: WeatherstackResponse): CityWeather {
    const { location, current } = data;

    return {
      id: generateCityId(location.name, location.country),
      name: location.name,
      country: location.country,
      temperature: current.temperature,
      feelsLike: current.feelslike,
      condition: current.weather_descriptions[0] || "Unknown",
      conditionIcon: current.weather_icons[0] || "",
      humidity: current.humidity,
      windSpeed: current.wind_speed,
      pressure: current.pressure,
      visibility: current.visibility,
      cloudCover: current.cloudcover,
      uvIndex: current.uv_index,
      lastUpdated: Date.now(),
    };
  }

  /**
   * Fetch weather for a single city by name
   */
  async fetchWeatherByCity(cityName: string): Promise<CityWeather> {
    try {
      const response = await axios.get<WeatherstackResponse>(
        `${this.baseURL}/current`,
        {
          params: {
            access_key: API_KEY,
            query: cityName,
          },
        }
      );

      if (!response.data || !response.data.location) {
        throw new Error("City not found");
      }

      return this.transformResponse(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.error?.info || "Failed to fetch weather data"
        );
      }
      throw error;
    }
  }

  /**
   * Fetch weather by coordinates (for user location)
   */
  async fetchWeatherByCoords(lat: number, lon: number): Promise<CityWeather> {
    try {
      const response = await axios.get<WeatherstackResponse>(
        `${this.baseURL}/current`,
        {
          params: {
            access_key: API_KEY,
            query: `${lat},${lon}`,
          },
        }
      );

      if (!response.data || !response.data.location) {
        throw new Error("Location not found");
      }

      return this.transformResponse(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.error?.info || "Failed to fetch weather data"
        );
      }
      throw error;
    }
  }

  /**
   * Fetch weather for multiple cities
   */
  async fetchMultipleCities(
    cities: Array<{ name: string; country: string }>
  ): Promise<CityWeather[]> {
    try {
      const weatherData: CityWeather[] = [];

      for (const city of cities) {
        try {
          const data = await this.fetchWeatherByCity(city.name);
          weatherData.push(data);
          // Small delay to avoid rate limiting
          await new Promise((resolve) => setTimeout(resolve, 1000));
        } catch (error) {
          console.error(`Failed to fetch weather for ${city.name}:`, error);
        }
      }

      return weatherData;
    } catch (error) {
      throw new Error("Failed to fetch weather for multiple cities");
    }
  }
}

export const weatherAPI = new WeatherAPIService();
