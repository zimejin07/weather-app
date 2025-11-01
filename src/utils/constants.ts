// 15 largest cities by population in alphabetical order
export const DEFAULT_CITIES = [
  { name: "Beijing", country: "China" },
  { name: "Buenos Aires", country: "Argentina" },
  { name: "Cairo", country: "Egypt" },
  { name: "Chongqing", country: "China" },
  { name: "Delhi", country: "India" },
  { name: "Dhaka", country: "Bangladesh" },
  { name: "Istanbul", country: "Turkey" },
  { name: "Karachi", country: "Pakistan" },
  { name: "Kolkata", country: "India" },
  { name: "Mexico City", country: "Mexico" },
  { name: "Mumbai", country: "India" },
  { name: "Osaka", country: "Japan" },
  { name: "São Paulo", country: "Brazil" },
  { name: "Shanghai", country: "China" },
  { name: "Tokyo", country: "Japan" },
];

// localStorage keys
export const STORAGE_KEYS = {
  WEATHER_CACHE: "weather_cache",
  FAVORITES: "favorites",
  NOTES: "city_notes",
  LAST_SYNC: "last_sync",
  USER_LOCATION: "user_location",
} as const;

// Cache duration in milliseconds (30 minutes)
export const CACHE_DURATION = 30 * 60 * 1000;

// API endpoints
export const API_CONFIG = {
  WEATHERSTACK_BASE_URL: "http://api.weatherstack.com",
  GEONAMES_BASE_URL: "http://api.geonames.org",
} as const;
