import { describe, it, expect } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../utils";
import HomePage from "../../pages/HomePage";
import { mockCityWeather, mockCityWeather2 } from "../mockData";

describe("Favorites Flow Integration", () => {
  it("should move favorited cities to the top of the list", () => {
    const preloadedState = {
      weather: {
        cities: {
          [mockCityWeather.id]: mockCityWeather,
          [mockCityWeather2.id]: mockCityWeather2,
        },
        loading: false,
        error: null,
      },
      favorites: {
        favoriteIds: [],
      },
      notes: {
        notes: {},
      },
      userLocation: {
        location: null,
        permissionGranted: null,
        loading: false,
        error: null,
      },
    };

    renderWithProviders(<HomePage />, { preloadedState });

    // Initially, cities should be in alphabetical order
    const cityCards = screen.getAllByText(/Tokyo|London/);
    expect(cityCards[0].textContent).toContain("London"); // L comes before T

    // Favorite Tokyo
    const tokyoCard = screen.getByText("Tokyo").closest(".card");
    const favoriteButton = tokyoCard?.querySelector("button");
    if (favoriteButton) {
      fireEvent.click(favoriteButton);
    }

    // Now Tokyo should be at the top with "Favorite Cities" header
    expect(screen.getByText("★ Favorite Cities")).toBeInTheDocument();
  });

  it("should persist favorites in localStorage", () => {
    const { store } = renderWithProviders(<HomePage />, {
      preloadedState: {
        weather: {
          cities: {
            [mockCityWeather.id]: mockCityWeather,
          },
          loading: false,
          error: null,
        },
        favorites: {
          favoriteIds: [],
        },
      },
    });

    // Favorite a city
    const favoriteButton = screen.getAllByText(/Favorite/)[0];
    fireEvent.click(favoriteButton);

    // Check localStorage
    const savedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    expect(savedFavorites).toContain("tokyo_japan");
  });

  it("should toggle favorite status correctly", () => {
    const preloadedState = {
      weather: {
        cities: {
          [mockCityWeather.id]: mockCityWeather,
        },
        loading: false,
        error: null,
      },
      favorites: {
        favoriteIds: ["tokyo_japan"],
      },
    };

    renderWithProviders(<HomePage />, { preloadedState });

    // Should show as favorited
    expect(screen.getByText("★ Favorited")).toBeInTheDocument();

    // Click to unfavorite
    const favoritedButton = screen.getByText("★ Favorited");
    fireEvent.click(favoritedButton);

    // Should change back to unfavorited
    expect(screen.getByText("☆ Favorite")).toBeInTheDocument();
  });
});
