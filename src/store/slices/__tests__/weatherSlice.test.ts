import { describe, it, expect, beforeEach } from "vitest";
import weatherReducer, {
  addCity,
  removeCity,
  loadCachedData,
  clearError,
  selectAllCities,
  selectCityById,
} from "../weatherSlice";
import type { WeatherState } from "../../../types";
import { mockCityWeather, mockCityWeather2 } from "../../../test/mockData";

describe("weatherSlice", () => {
  const initialState: WeatherState = {
    cities: {},
    loading: false,
    error: null,
  };

  beforeEach(() => {
    localStorage.clear();
  });

  describe("reducers", () => {
    it("should handle addCity", () => {
      const state = weatherReducer(initialState, addCity(mockCityWeather));

      expect(state.cities[mockCityWeather.id]).toEqual(mockCityWeather);
      expect(Object.keys(state.cities)).toHaveLength(1);
    });

    it("should handle removeCity", () => {
      const stateWithCity: WeatherState = {
        cities: { [mockCityWeather.id]: mockCityWeather },
        loading: false,
        error: null,
      };

      const state = weatherReducer(
        stateWithCity,
        removeCity(mockCityWeather.id)
      );

      expect(state.cities[mockCityWeather.id]).toBeUndefined();
      expect(Object.keys(state.cities)).toHaveLength(0);
    });

    it("should handle loadCachedData when cache exists", () => {
      const cachedData = {
        [mockCityWeather.id]: mockCityWeather,
        [mockCityWeather2.id]: mockCityWeather2,
      };

      localStorage.setItem("weather_cache", JSON.stringify(cachedData));

      const state = weatherReducer(initialState, loadCachedData());

      expect(Object.keys(state.cities)).toHaveLength(2);
      expect(state.cities[mockCityWeather.id]).toEqual(mockCityWeather);
    });

    it("should handle loadCachedData when cache is empty", () => {
      const state = weatherReducer(initialState, loadCachedData());

      expect(Object.keys(state.cities)).toHaveLength(0);
    });

    it("should handle clearError", () => {
      const stateWithError: WeatherState = {
        cities: {},
        loading: false,
        error: "Some error",
      };

      const state = weatherReducer(stateWithError, clearError());

      expect(state.error).toBeNull();
    });
  });

  describe("selectors", () => {
    it("selectAllCities should return array of all cities", () => {
      const state = {
        weather: {
          cities: {
            [mockCityWeather.id]: mockCityWeather,
            [mockCityWeather2.id]: mockCityWeather2,
          },
          loading: false,
          error: null,
        },
      } as any;

      const cities = selectAllCities(state);

      expect(cities).toHaveLength(2);
      expect(cities).toContainEqual(mockCityWeather);
      expect(cities).toContainEqual(mockCityWeather2);
    });

    it("selectCityById should return specific city", () => {
      const state = {
        weather: {
          cities: {
            [mockCityWeather.id]: mockCityWeather,
          },
          loading: false,
          error: null,
        },
      } as any;

      const city = selectCityById(state, mockCityWeather.id);

      expect(city).toEqual(mockCityWeather);
    });

    it("selectCityById should return undefined for non-existent city", () => {
      const state = {
        weather: {
          cities: {},
          loading: false,
          error: null,
        },
      } as any;

      const city = selectCityById(state, "non-existent");

      expect(city).toBeUndefined();
    });
  });
});
