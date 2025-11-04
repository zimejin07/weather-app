import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../test/utils";
import SearchBar from "../SearchBar";
import { geoAPI } from "../../services/geoAPI";
import { weatherAPI } from "../../services/weatherAPI";
import { mockCityWeather, mockGeoNamesResponse } from "../../test/mockData";

vi.mock("../../services/geoAPI");
vi.mock("../../services/weatherAPI");

describe("SearchBar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should render search input", () => {
    renderWithProviders(<SearchBar />);

    expect(
      screen.getByPlaceholderText("Search for a city...")
    ).toBeInTheDocument();
  });

  it("should disable search when offline", () => {
    Object.defineProperty(window.navigator, "onLine", {
      writable: true,
      value: false,
    });

    renderWithProviders(<SearchBar />);

    const input = screen.getByPlaceholderText("Search unavailable offline");
    expect(input).toBeDisabled();

    // Reset
    Object.defineProperty(window.navigator, "onLine", {
      writable: true,
      value: true,
    });
  });

  it("should show suggestions when typing", async () => {
    vi.mocked(geoAPI.searchCities).mockResolvedValue(
      mockGeoNamesResponse.geonames
    );

    const user = userEvent.setup({ delay: null });
    renderWithProviders(<SearchBar />);

    const input = screen.getByPlaceholderText("Search for a city...");

    await act(async () => {
      await user.type(input, "Tokyo");
      // Advance timers to trigger debounce (300ms)
      vi.advanceTimersByTime(300);
    });

    await waitFor(() => {
      expect(screen.getByText("Tokyo")).toBeInTheDocument();
      expect(screen.getByText("Japan")).toBeInTheDocument();
    });
  });

  it("should not search with less than 2 characters", async () => {
    const searchSpy = vi.mocked(geoAPI.searchCities);

    const user = userEvent.setup({ delay: null });
    renderWithProviders(<SearchBar />);

    const input = screen.getByPlaceholderText("Search for a city...");

    await act(async () => {
      await user.type(input, "T");
      // Advance timers to ensure debounce would have fired
      vi.advanceTimersByTime(400);
    });

    expect(searchSpy).not.toHaveBeenCalled();
  });

  it("should clear input after city selection", async () => {
    vi.mocked(geoAPI.searchCities).mockResolvedValue(
      mockGeoNamesResponse.geonames
    );
    vi.mocked(weatherAPI.fetchWeatherByCity).mockResolvedValue(mockCityWeather);

    const user = userEvent.setup({ delay: null });
    renderWithProviders(<SearchBar />);

    const input = screen.getByPlaceholderText(
      "Search for a city..."
    ) as HTMLInputElement;

    await act(async () => {
      await user.type(input, "Tokyo");
      vi.advanceTimersByTime(300);
    });

    await waitFor(() => {
      expect(screen.getByText("Tokyo")).toBeInTheDocument();
    });

    const cityButton = screen.getByText("Tokyo");

    await act(async () => {
      await user.click(cityButton);
    });

    await waitFor(() => {
      expect(input.value).toBe("");
    });
  });
});
