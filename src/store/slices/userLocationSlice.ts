import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { UserLocationState } from "../../types";
import { weatherAPI } from "../../services/weatherAPI";
import { storageService } from "../../services/storage";
import type { RootState } from "../index";

const initialState: UserLocationState = {
  location: null,
  permissionGranted: null,
  loading: false,
  error: null,
};

export const fetchUserLocation = createAsyncThunk(
  "userLocation/fetch",
  async (_, { rejectWithValue }) => {
    try {
      // Request geolocation permission
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            timeout: 10000,
            maximumAge: 0,
          });
        }
      );

      const { latitude, longitude } = position.coords;
      const weather = await weatherAPI.fetchWeatherByCoords(
        latitude,
        longitude
      );

      return weather;
    } catch (error) {
      if (error instanceof GeolocationPositionError) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Failed to get user location");
    }
  }
);

const userLocationSlice = createSlice({
  name: "userLocation",
  initialState,
  reducers: {
    loadUserLocation: (state) => {
      const location = storageService.loadUserLocation();
      if (location) {
        state.location = location;
        state.permissionGranted = true;
      }
    },
    clearUserLocation: (state) => {
      state.location = null;
      state.permissionGranted = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserLocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.location = action.payload;
        state.permissionGranted = true;
        storageService.saveUserLocation(action.payload);
      })
      .addCase(fetchUserLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.permissionGranted = false;
      });
  },
});

export const { loadUserLocation, clearUserLocation } =
  userLocationSlice.actions;

// Selectors
export const selectUserLocation = (state: RootState) =>
  state.userLocation.location;
export const selectLocationPermission = (state: RootState) =>
  state.userLocation.permissionGranted;
export const selectLocationLoading = (state: RootState) =>
  state.userLocation.loading;
export const selectLocationError = (state: RootState) =>
  state.userLocation.error;

export default userLocationSlice.reducer;
