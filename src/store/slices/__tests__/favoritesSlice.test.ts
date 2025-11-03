import { describe, it, expect, beforeEach } from "vitest";
import favoritesReducer, {
  addFavorite,
  removeFavorite,
  toggleFavorite,
  loadFavorites,
  selectIsFavorite,
} from "../favoritesSlice";
import type { FavoritesState } from "../../../types";

describe("favoritesSlice", () => {
  const initialState: FavoritesState = {
    favoriteIds: [],
  };

  beforeEach(() => {
    localStorage.clear();
  });

  describe("reducers", () => {
    it("should handle addFavorite", () => {
      const state = favoritesReducer(initialState, addFavorite("tokyo_japan"));

      expect(state.favoriteIds).toContain("tokyo_japan");
      expect(state.favoriteIds).toHaveLength(1);
    });

    it("should not add duplicate favorites", () => {
      let state = favoritesReducer(initialState, addFavorite("tokyo_japan"));
      state = favoritesReducer(state, addFavorite("tokyo_japan"));

      expect(state.favoriteIds).toHaveLength(1);
    });

    it("should handle removeFavorite", () => {
      const stateWithFavorite: FavoritesState = {
        favoriteIds: ["tokyo_japan", "london_uk"],
      };

      const state = favoritesReducer(
        stateWithFavorite,
        removeFavorite("tokyo_japan")
      );

      expect(state.favoriteIds).not.toContain("tokyo_japan");
      expect(state.favoriteIds).toContain("london_uk");
      expect(state.favoriteIds).toHaveLength(1);
    });

    it("should handle toggleFavorite - add when not exists", () => {
      const state = favoritesReducer(
        initialState,
        toggleFavorite("tokyo_japan")
      );

      expect(state.favoriteIds).toContain("tokyo_japan");
    });

    it("should handle toggleFavorite - remove when exists", () => {
      const stateWithFavorite: FavoritesState = {
        favoriteIds: ["tokyo_japan"],
      };

      const state = favoritesReducer(
        stateWithFavorite,
        toggleFavorite("tokyo_japan")
      );

      expect(state.favoriteIds).not.toContain("tokyo_japan");
      expect(state.favoriteIds).toHaveLength(0);
    });

    it("should handle loadFavorites from localStorage", () => {
      const favorites = ["tokyo_japan", "london_uk"];
      localStorage.setItem("favorites", JSON.stringify(favorites));

      const state = favoritesReducer(initialState, loadFavorites());

      expect(state.favoriteIds).toEqual(favorites);
    });

    it("should handle loadFavorites when localStorage is empty", () => {
      const state = favoritesReducer(initialState, loadFavorites());

      expect(state.favoriteIds).toEqual([]);
    });
  });

  describe("selectors", () => {
    it("selectIsFavorite should return true for favorited city", () => {
      const state = {
        favorites: {
          favoriteIds: ["tokyo_japan"],
        },
      } as any;

      expect(selectIsFavorite(state, "tokyo_japan")).toBe(true);
    });

    it("selectIsFavorite should return false for non-favorited city", () => {
      const state = {
        favorites: {
          favoriteIds: ["tokyo_japan"],
        },
      } as any;

      expect(selectIsFavorite(state, "london_uk")).toBe(false);
    });
  });
});
