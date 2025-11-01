import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { FavoritesState } from "../../types";
import { storageService } from "../../services/storage";
import type { RootState } from "../index";

const initialState: FavoritesState = {
  favoriteIds: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<string>) => {
      if (!state.favoriteIds.includes(action.payload)) {
        state.favoriteIds.push(action.payload);
        storageService.saveFavorites(state.favoriteIds);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favoriteIds = state.favoriteIds.filter(
        (id) => id !== action.payload
      );
      storageService.saveFavorites(state.favoriteIds);
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const index = state.favoriteIds.indexOf(action.payload);
      if (index >= 0) {
        state.favoriteIds.splice(index, 1);
      } else {
        state.favoriteIds.push(action.payload);
      }
      storageService.saveFavorites(state.favoriteIds);
    },
    loadFavorites: (state) => {
      const favorites = storageService.loadFavorites();
      state.favoriteIds = favorites;
    },
  },
});

export const { addFavorite, removeFavorite, toggleFavorite, loadFavorites } =
  favoritesSlice.actions;

// Selectors
export const selectFavoriteIds = (state: RootState) =>
  state.favorites.favoriteIds;
export const selectIsFavorite = (state: RootState, cityId: string) =>
  state.favorites.favoriteIds.includes(cityId);

export default favoritesSlice.reducer;
