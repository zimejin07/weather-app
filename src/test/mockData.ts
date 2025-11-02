import type { CityWeather } from "../types";

export const mockCityWeather: CityWeather = {
  id: "tokyo_japan",
  name: "Tokyo",
  country: "Japan",
  temperature: 22,
  feelsLike: 24,
  condition: "Partly cloudy",
  conditionIcon:
    "https://cdn.weatherstack.com/images/wsymbols01_png_64/wsymbol_0002_sunny_intervals.png",
  humidity: 60,
  windSpeed: 15,
  pressure: 1013,
  visibility: 10,
  cloudCover: 25,
  uvIndex: 5,
  lastUpdated: Date.now(),
};

export const mockCityWeather2: CityWeather = {
  id: "london_united-kingdom",
  name: "London",
  country: "United Kingdom",
  temperature: 15,
  feelsLike: 13,
  condition: "Overcast",
  conditionIcon:
    "https://cdn.weatherstack.com/images/wsymbols01_png_64/wsymbol_0004_black_low_cloud.png",
  humidity: 75,
  windSpeed: 20,
  pressure: 1010,
  visibility: 8,
  cloudCover: 90,
  uvIndex: 2,
  lastUpdated: Date.now(),
};

export const mockWeatherstackResponse = {
  location: {
    name: "Tokyo",
    country: "Japan",
  },
  current: {
    temperature: 22,
    weather_descriptions: ["Partly cloudy"],
    weather_icons: [
      "https://cdn.weatherstack.com/images/wsymbols01_png_64/wsymbol_0002_sunny_intervals.png",
    ],
    humidity: 60,
    wind_speed: 15,
    pressure: 1013,
    feelslike: 24,
    visibility: 10,
    cloudcover: 25,
    uv_index: 5,
  },
};

export const mockGeoNamesResponse = {
  geonames: [
    {
      geonameId: 1850144,
      name: "Tokyo",
      countryName: "Japan",
      lat: "35.6895",
      lng: "139.69171",
    },
    {
      geonameId: 2643743,
      name: "London",
      countryName: "United Kingdom",
      lat: "51.50853",
      lng: "-0.12574",
    },
  ],
};
