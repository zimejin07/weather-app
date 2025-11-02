import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../../test/utils";
import CityCard from "../CityCard";
import { mockCityWeather } from "../../test/mockData";

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock window.confirm
global.confirm = vi.fn(() => true);

describe("CityCard", () => {
  it("should render city information correctly", () => {
    renderWithProviders(<CityCard city={mockCityWeather} />);

    expect(screen.getByText("Tokyo")).toBeInTheDocument();
    expect(screen.getByText("Japan")).toBeInTheDocument();
    expect(screen.getByText("22°C")).toBeInTheDocument();
    expect(screen.getByText("Partly cloudy")).toBeInTheDocument();
    expect(screen.getByText("24°C")).toBeInTheDocument(); // Feels like
    expect(screen.getByText("60%")).toBeInTheDocument(); // Humidity
  });

  it("should navigate to city details on card click", () => {
    renderWithProviders(<CityCard city={mockCityWeather} />);

    const card = screen.getByText("Tokyo").closest(".card");
    fireEvent.click(card!);

    expect(mockNavigate).toHaveBeenCalledWith("/city/tokyo_japan");
  });

  it("should toggle favorite when favorite button clicked", () => {
    const { store } = renderWithProviders(<CityCard city={mockCityWeather} />);

    const favoriteButton = screen.getByText("☆ Favorite");
    fireEvent.click(favoriteButton);

    const state = store.getState();
    expect(state.favorites.favoriteIds).toContain("tokyo_japan");
  });

  it('should show "★ Favorited" for favorited cities', () => {
    const preloadedState = {
      favorites: {
        favoriteIds: ["tokyo_japan"],
      },
    };

    renderWithProviders(<CityCard city={mockCityWeather} />, {
      preloadedState,
    });

    expect(screen.getByText("★ Favorited")).toBeInTheDocument();
    expect(screen.getByText("★ Favorite")).toBeInTheDocument(); // Badge
  });

  it("should show remove button by default", () => {
    renderWithProviders(<CityCard city={mockCityWeather} />);

    expect(screen.getByText("Remove")).toBeInTheDocument();
  });

  it("should hide remove button when showRemove is false", () => {
    renderWithProviders(<CityCard city={mockCityWeather} showRemove={false} />);

    expect(screen.queryByText("Remove")).not.toBeInTheDocument();
  });

  it("should remove city when remove button clicked and confirmed", () => {
    const { store } = renderWithProviders(<CityCard city={mockCityWeather} />, {
      preloadedState: {
        weather: {
          cities: {
            [mockCityWeather.id]: mockCityWeather,
          },
          loading: false,
          error: null,
        },
      },
    });

    const removeButton = screen.getByText("Remove");
    fireEvent.click(removeButton);

    const state = store.getState();
    expect(state.weather.cities[mockCityWeather.id]).toBeUndefined();
  });

  it("should display weather icon when available", () => {
    renderWithProviders(<CityCard city={mockCityWeather} />);

    const image = screen.getByAltText("Partly cloudy");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", mockCityWeather.conditionIcon);
  });
});
