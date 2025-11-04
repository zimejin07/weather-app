import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../test/utils';
import CityCard from '../CityCard';
import { mockCityWeather } from '../../test/mockData';
import "@testing-library/jest-dom";

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock window.confirm
window.confirm = vi.fn(() => true);

describe('CityCard', () => {
  it('should render city information correctly', () => {
    renderWithProviders(<CityCard city={mockCityWeather} />);

    expect(screen.getByText('Tokyo')).toBeInTheDocument();
    expect(screen.getByText('Japan')).toBeInTheDocument();
    expect(screen.getByText('22°C')).toBeInTheDocument();
    expect(screen.getByText('Partly cloudy')).toBeInTheDocument();
  });

  it('should navigate to city details on card click', () => {
    renderWithProviders(<CityCard city={mockCityWeather} />);

    const card = screen.getByText('Tokyo').closest('.card');
    fireEvent.click(card!);

    expect(mockNavigate).toHaveBeenCalledWith('/city/tokyo_japan');
  });

  it('should toggle favorite when favorite button clicked', () => {
    const { store } = renderWithProviders(<CityCard city={mockCityWeather} />);

    const favoriteButton = screen.getByText('☆ Favorite');
    fireEvent.click(favoriteButton);

    const state = store.getState();
    expect(state.favorites.favoriteIds).toContain('tokyo_japan');
  });

  it('should show "⭐ Favorited" for favorited cities', () => {
    const preloadedState = {
      favorites: {
        favoriteIds: ['tokyo_japan'],
      },
    };

    renderWithProviders(<CityCard city={mockCityWeather} />, { preloadedState });

    expect(screen.getByText('⭐ Favorited')).toBeInTheDocument();
    expect(screen.getByText('Favorite')).toBeInTheDocument(); // Badge text
  });

  it('should show remove button by default', () => {
    renderWithProviders(<CityCard city={mockCityWeather} />);

    // The remove button now uses emoji 🗑️
    const removeButton = screen.getByRole('button', { name: /🗑️/i });
    expect(removeButton).toBeInTheDocument();
  });

  it('should hide remove button when showRemove is false', () => {
    renderWithProviders(<CityCard city={mockCityWeather} showRemove={false} />);

    const removeButton = screen.queryByRole('button', { name: /🗑️/i });
    expect(removeButton).not.toBeInTheDocument();
  });

  it('should remove city when remove button clicked and confirmed', () => {
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

    const removeButton = screen.getByRole('button', { name: /🗑️/i });
    fireEvent.click(removeButton);

    const state = store.getState();
    expect(state.weather.cities[mockCityWeather.id]).toBeUndefined();
  });

  it('should display weather icon', () => {
    const { container } = renderWithProviders(<CityCard city={mockCityWeather} />);

    // Check for SVG icon instead of img
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('should display humidity and wind speed', () => {
    renderWithProviders(<CityCard city={mockCityWeather} />);

    expect(screen.getByText('60%')).toBeInTheDocument();
    expect(screen.getByText('15 km/h')).toBeInTheDocument();
  });
});