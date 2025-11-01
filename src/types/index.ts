export interface CityWeather {
  id: string;
  name: string;
  country: string;
  temperature: number;
  feelsLike: number;
  condition: string;
  conditionIcon: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  visibility: number;
  cloudCover: number;
  uvIndex: number;
  lastUpdated: number;
}

export interface CityNote {
  cityId: string;
  note: string;
  lastModified: number;
}

export interface WeatherState {
  cities: Record<string, CityWeather>;
  loading: boolean;
  error: string | null;
}

export interface FavoritesState {
  favoriteIds: string[];
}

export interface NotesState {
  notes: Record<string, string>;
}

export interface UserLocationState {
  location: CityWeather | null;
  permissionGranted: boolean | null;
  loading: boolean;
  error: string | null;
}

export interface SearchState {
  query: string;
  results: CityWeather[];
  loading: boolean;
  error: string | null;
}

// API Response types
export interface WeatherstackResponse {
  location: {
    name: string;
    country: string;
  };
  current: {
    temperature: number;
    weather_descriptions: string[];
    weather_icons: string[];
    humidity: number;
    wind_speed: number;
    pressure: number;
    feelslike: number;
    visibility: number;
    cloudcover: number;
    uv_index: number;
  };
}

export interface GeoNamesResponse {
  geonames: Array<{
    geonameId: number;
    name: string;
    countryName: string;
    lat: string;
    lng: string;
  }>;
}
