import { describe, it, expect, vi } from "vitest";
import {
  generateCityId,
  isCacheValid,
  sortCities,
  formatTemperature,
  formatDate,
  debounce,
  isOnline,
} from "../helpers";
import { mockCityWeather, mockCityWeather2 } from "../../test/mockData";
import { CACHE_DURATION } from "../constants";

describe("helpers", () => {
  describe("generateCityId", () => {
    it("should generate correct city ID", () => {
      expect(generateCityId("Tokyo", "Japan")).toBe("tokyo_japan");
      expect(generateCityId("New York", "United States")).toBe(
        "new-york_united-states"
      );
      expect(generateCityId("São Paulo", "Brazil")).toBe("são-paulo_brazil");
    });

    it("should handle multiple spaces", () => {
      expect(generateCityId("Los   Angeles", "United  States")).toBe(
        "los-angeles_united-states"
      );
    });
  });

  describe("isCacheValid", () => {
    it("should return true for recent timestamps", () => {
      const recentTimestamp = Date.now() - 1000; // 1 second ago
      expect(isCacheValid(recentTimestamp)).toBe(true);
    });

    it("should return false for old timestamps", () => {
      const oldTimestamp = Date.now() - CACHE_DURATION - 1000; // 31 minutes ago
      expect(isCacheValid(oldTimestamp)).toBe(false);
    });

    it("should return true for timestamp exactly at cache duration", () => {
      const timestamp = Date.now() - CACHE_DURATION + 1000;
      expect(isCacheValid(timestamp)).toBe(true);
    });
  });

  describe("sortCities", () => {
    it("should sort favorites first, then alphabetically", () => {
      const cities = [mockCityWeather2, mockCityWeather];
      const favoriteIds = ["tokyo_japan"];
      const sorted = sortCities(cities, favoriteIds);

      expect(sorted[0].id).toBe("tokyo_japan");
      expect(sorted[1].id).toBe("london_united-kingdom");
    });

    it("should sort all cities alphabetically when no favorites", () => {
      const cities = [mockCityWeather, mockCityWeather2];
      const sorted = sortCities(cities, []);

      expect(sorted[0].name).toBe("London");
      expect(sorted[1].name).toBe("Tokyo");
    });

    it("should handle empty cities array", () => {
      const sorted = sortCities([], []);
      expect(sorted).toEqual([]);
    });
  });

  describe("formatTemperature", () => {
    it("should format temperature with Celsius by default", () => {
      expect(formatTemperature(22)).toBe("22°C");
      expect(formatTemperature(22.7)).toBe("23°C");
      expect(formatTemperature(-5)).toBe("-5°C");
    });

    it("should format temperature with Fahrenheit when specified", () => {
      expect(formatTemperature(72, "F")).toBe("72°F");
    });

    it("should round to nearest integer", () => {
      expect(formatTemperature(22.4)).toBe("22°C");
      expect(formatTemperature(22.6)).toBe("23°C");
    });
  });

  describe("formatDate", () => {
    it("should format timestamp to readable string", () => {
      const timestamp = new Date("2024-01-15T10:30:00").getTime();
      const formatted = formatDate(timestamp);
      expect(formatted).toContain("2024");
      // Check for either "Jan" or "1/" depending on locale
      expect(formatted.match(/Jan|1\//)).toBeTruthy();
    });
  });

  describe("debounce", () => {
    it("should debounce function calls", async () => {
      vi.useFakeTimers();
      const mockFn = vi.fn();
      const debouncedFn = debounce(mockFn, 300);

      debouncedFn("test1");
      debouncedFn("test2");
      debouncedFn("test3");

      expect(mockFn).not.toHaveBeenCalled();

      vi.advanceTimersByTime(300);

      expect(mockFn).toHaveBeenCalledTimes(1);
      expect(mockFn).toHaveBeenCalledWith("test3");

      vi.useRealTimers();
    });
  });

  describe("isOnline", () => {
    it("should return navigator.onLine status", () => {
      expect(isOnline()).toBe(true);
    });
  });
});
