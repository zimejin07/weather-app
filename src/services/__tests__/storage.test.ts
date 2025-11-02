import { describe, it, expect, beforeEach } from "vitest";
import { storageService } from "../storage";
import { mockCityWeather, mockCityWeather2 } from "../../test/mockData";

describe("StorageService", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("Weather Cache", () => {
    it("should save and load weather cache", () => {
      const cities = {
        [mockCityWeather.id]: mockCityWeather,
        [mockCityWeather2.id]: mockCityWeather2,
      };

      storageService.saveWeatherCache(cities);
      const loaded = storageService.loadWeatherCache();

      expect(loaded).toEqual(cities);
    });

    it("should return null when cache is empty", () => {
      const loaded = storageService.loadWeatherCache();
      expect(loaded).toBeNull();
    });

    it("should update last sync timestamp when saving cache", () => {
      const cities = { [mockCityWeather.id]: mockCityWeather };

      storageService.saveWeatherCache(cities);
      const lastSync = storageService.getLastSync();

      expect(lastSync).toBeDefined();
      expect(typeof lastSync).toBe("number");
    });
  });

  describe("Favorites", () => {
    it("should save and load favorites", () => {
      const favorites = ["tokyo_japan", "london_uk"];

      storageService.saveFavorites(favorites);
      const loaded = storageService.loadFavorites();

      expect(loaded).toEqual(favorites);
    });

    it("should return empty array when no favorites exist", () => {
      const loaded = storageService.loadFavorites();
      expect(loaded).toEqual([]);
    });
  });

  describe("Notes", () => {
    it("should save and load notes", () => {
      const notes = {
        tokyo_japan: "Beautiful weather today!",
        london_uk: "Quite rainy",
      };

      storageService.saveNotes(notes);
      const loaded = storageService.loadNotes();

      expect(loaded).toEqual(notes);
    });

    it("should return empty object when no notes exist", () => {
      const loaded = storageService.loadNotes();
      expect(loaded).toEqual({});
    });
  });

  describe("User Location", () => {
    it("should save and load user location", () => {
      storageService.saveUserLocation(mockCityWeather);
      const loaded = storageService.loadUserLocation();

      expect(loaded).toEqual(mockCityWeather);
    });

    it("should return null when no location is saved", () => {
      const loaded = storageService.loadUserLocation();
      expect(loaded).toBeNull();
    });
  });

  describe("Last Sync", () => {
    it("should get last sync timestamp", () => {
      const timestamp = Date.now().toString();
      localStorage.setItem("last_sync", timestamp);

      const lastSync = storageService.getLastSync();
      expect(lastSync).toBe(parseInt(timestamp, 10));
    });

    it("should return null when no sync timestamp exists", () => {
      const lastSync = storageService.getLastSync();
      expect(lastSync).toBeNull();
    });
  });

  describe("Clear All", () => {
    it("should clear all storage", () => {
      // Set some data
      storageService.saveWeatherCache({
        [mockCityWeather.id]: mockCityWeather,
      });
      storageService.saveFavorites(["tokyo_japan"]);
      storageService.saveNotes({ tokyo_japan: "Test note" });
      storageService.saveUserLocation(mockCityWeather);

      // Clear all
      storageService.clearAll();

      // Verify all cleared
      expect(storageService.loadWeatherCache()).toBeNull();
      expect(storageService.loadFavorites()).toEqual([]);
      expect(storageService.loadNotes()).toEqual({});
      expect(storageService.loadUserLocation()).toBeNull();
      expect(storageService.getLastSync()).toBeNull();
    });
  });
});
