import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { CityWeather, WeatherState } from "../../types";
import { weatherAPI } from "../../services/weatherAPI";
import { storageService } from "../../services/storage";
import { DEFAULT_CITIES } from "../../utils/constants";
import type { RootState } from "../index";

const initialState: WeatherState = {
  cities: {},
  loading: false,
  error: null,
};

// Async thunks
export const fetchDefaultCities = createAsyncThunk(
  "weather/fetchDefaultCities",
  async (_, { rejectWithValue }) => {
    try {
      const cities = await weatherAPI.fetchMultipleCities(DEFAULT_CITIES);
      return cities;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchCityWeather = createAsyncThunk(
  "weather/fetchCityWeather",
  async (cityName: string, { rejectWithValue }) => {
    try {
      const city = await weatherAPI.fetchWeatherByCity(cityName);
      return city;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const refreshCityWeather = createAsyncThunk(
  "weather/refreshCityWeather",
  async (cityId: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const city = state.weather.cities[cityId];

      if (!city) {
        throw new Error("City not found");
      }

      const updatedCity = await weatherAPI.fetchWeatherByCity(city.name);
      return updatedCity;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    addCity: (state, action: PayloadAction<CityWeather>) => {
      state.cities[action.payload.id] = action.payload;
      storageService.saveWeatherCache(state.cities);
    },
    removeCity: (state, action: PayloadAction<string>) => {
      delete state.cities[action.payload];
      storageService.saveWeatherCache(state.cities);
    },
    loadCachedData: (state) => {
      const cached = storageService.loadWeatherCache();
      if (cached) {
        state.cities = cached;
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch default cities
      .addCase(fetchDefaultCities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDefaultCities.fulfilled, (state, action) => {
        state.loading = false;
        action.payload.forEach((city) => {
          state.cities[city.id] = city;
        });
        storageService.saveWeatherCache(state.cities);
      })
      .addCase(fetchDefaultCities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch single city
      .addCase(fetchCityWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCityWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.cities[action.payload.id] = action.payload;
        storageService.saveWeatherCache(state.cities);
      })
      .addCase(fetchCityWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Refresh city
      .addCase(refreshCityWeather.fulfilled, (state, action) => {
        state.cities[action.payload.id] = action.payload;
        storageService.saveWeatherCache(state.cities);
      });
  },
});

export const { addCity, removeCity, loadCachedData, clearError } =
  weatherSlice.actions;

// Selectors
export const selectAllCities = (state: RootState) =>
  Object.values(state.weather.cities);
export const selectCityById = (state: RootState, cityId: string) =>
  state.weather.cities[cityId];
export const selectWeatherLoading = (state: RootState) => state.weather.loading;
export const selectWeatherError = (state: RootState) => state.weather.error;

export default weatherSlice.reducer;
