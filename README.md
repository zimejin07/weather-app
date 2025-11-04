# Weather App
A modern weather application built with React, TypeScript, and Redux Toolkit. Provides global weather data, offline access, and interactive UI features. When Weatherstack API quota is reached, the app automatically relies on local cached data to ensure continuous functionality.

![Weather App](https://img.shields.io/badge/React-18-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-cyan) ![Tests](https://img.shields.io/badge/Tests-Passing-green)

## Features

### Core Functionality
- Global weather for 15 major cities on first load

- City search with autocomplete

- Favorites list (alphabetical)

- Notes per city, stored locally

- Geolocation-based weather

- Offline mode with cached weather

- Dynamic animations and backgrounds based on weather

- Fully responsive UI

## Tech Stack

- **React 19** 
- **TypeScript 5**
- **Redux Toolkit** - State management
- **React Router v6** - Client-side routing
- **Tailwind CSS v4** - Utility-first styling
- **Vite** - Lightning-fast build tool
- **Vitest** - Unit and integration testing
- **Happy-dom** - Fast DOM testing environment
- **Axios** - HTTP client

## Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn
- Free API keys from:
  - [Weatherstack](https://weatherstack.com/) - Weather data (100 requests/month free)
  - [GeoNames](https://www.geonames.org/) - City search (20,000 requests/day free)

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/zimejin07/weather-app.git
cd weather-app
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:
```bash
# Weather API (sign up at https://weatherstack.com/)
VITE_WEATHERSTACK_API_KEY=your_weatherstack_api_key

# GeoNames API (register at https://www.geonames.org/login)
VITE_GEONAMES_USERNAME=your_geonames_username

# Optional: Use mock data to save API quota during development
VITE_USE_MOCK_DATA=true
```

**Getting API Keys:**
- **Weatherstack**: Sign up at https://weatherstack.com/, verify email, get API key from dashboard
- **GeoNames**: Register at https://www.geonames.org/login, verify email, activate free web services

### 4. Run the development server
```bash
npm run dev
```

### 5. Open your browser
Navigate to `http://localhost:5173`

## Usage

### First Time Setup

When you first open the app, you'll see an empty state with two options:

1. **📊 Load Mock Data (Free)** - Generates realistic weather data without using API quota (for testing)
2. **🌍 Load Real Data (15 API calls)** - Fetches real weather for 15 major cities

### Viewing Weather

- City cards display temperature, condition, humidity, and wind speed
- Click any card to view detailed weather information
- Animated icons show current weather conditions

### Searching for Cities

- Use the search bar at the top of the home page
- Type at least 2 characters to see suggestions
- Click on a suggestion to add it to your list
- Note: Search is disabled when offline

### Managing Favorites

- Click **"☆ Favorite"** on any city card to add to favorites
- Favorite cities appear at the top with a gold badge
- Click **"⭐ Favorited"** to remove from favorites
- Favorites are sorted alphabetically

### Adding Notes

- Navigate to a city's detail page
- Use the "Weather Notes" section to add observations
- Click "Edit" to modify existing notes
- Notes are saved automatically to localStorage

### Using Your Location

- Click **"My Location"** in the navigation
- Grant location permission when prompted
- View weather for your current location
- Click "Refresh Location" to update

### Offline Mode

- The app automatically detects when you're offline
- Cached weather data remains accessible
- Search functionality is disabled offline
- All favorites and notes work offline

### Refreshing Data

- Click **"Refresh All"** button on home page to update all cities (uses 15 API requests)
- Click **"Refresh"** on individual city detail pages (uses 1 API request)
- Data is automatically cached for 30 minutes

## Weather Animations

### Animated Icons
- **Sunny** - Rotating sun with rays
- **Rainy** - Falling raindrops
- **Cloudy** - Floating clouds
- **Partly Cloudy** - Sun with clouds
- **Snowy** - Falling snowflakes
- **Thunderstorm** - Lightning bolts
- **Foggy/Misty** - Animated fog
- **Windy** - Flowing wind lines

### Dynamic Backgrounds
- **Rainy** - Falling rain animation across screen
- **Snowy** - Floating snowflakes
- **Cloudy** - Drifting cloud shapes
- **Sunny** - Glowing particle effects

## Managing API Quota

### Free Tier Limits
- **Weatherstack**: 100 requests/month
- **GeoNames**: 20,000 requests/day

### API Usage Breakdown
- **Full Refresh (15 cities)**: 15 requests
- **Add Single City**: 1 request
- **Individual Refresh**: 1 request
- **User Location**: 1 request

### Quota Saving Strategies

**1. Use Mock Data for Development**
```bash
# In .env file
VITE_USE_MOCK_DATA=true
```

**2. Load Mock Data from UI**
- Click "📊 Load Mock Data (Free)" button on first load
- Generates realistic fake weather data
- Zero API calls

**3. Leverage Caching**
- App automatically loads cached data on startup
- Only refresh when you need updated weather
- 30-minute cache duration

**4. Smart Refresh**
- The app won't auto-refresh on load
- Manual "Refresh All" button with confirmation
- Shows last sync time

### Monthly Planning
With 100 requests/month, you can:
- Do 6 full refreshes (6 × 15 = 90 requests)
- Add 10 new cities individually
- Use mock data for all testing and development

## 🧪 Testing

### Run Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

### Test Coverage
- **66+ tests** covering all major functionality
- **Unit tests** for utilities, Redux slices, services
- **Component tests** for React components
- **Integration tests** for user flows
- **80%+ code coverage**

### Test Structure
```
src/
├── test/
│   ├── setup.ts              # Test environment setup
│   ├── utils.tsx             # Test utilities
│   ├── mockData.ts           # Mock data
│   └── integration/          # Integration tests
├── components/__tests__/     # Component tests
├── services/__tests__/       # Service tests
├── store/slices/__tests__/   # Redux tests
└── utils/__tests__/          # Utility tests
```

## Project Structure

```
weather-app/
├── src/
│   ├── components/           # React components
│   │   ├── CityCard.tsx
│   │   ├── Navbar.tsx
│   │   ├── SearchBar.tsx
│   │   ├── WeatherIcon.tsx
│   │   ├── WeatherBackground.tsx
│   │   └── __tests__/
│   ├── pages/               # Page components
│   │   ├── HomePage.tsx
│   │   ├── CityDetailsPage.tsx
│   │   └── UserLocationPage.tsx
│   ├── store/               # Redux store
│   │   ├── slices/
│   │   │   ├── weatherSlice.ts
│   │   │   ├── favoritesSlice.ts
│   │   │   ├── notesSlice.ts
│   │   │   └── userLocationSlice.ts
│   │   ├── hooks.ts
│   │   └── index.ts
│   ├── services/            # API services
│   │   ├── weatherAPI.ts
│   │   ├── geoAPI.ts
│   │   └── storage.ts
│   ├── types/               # TypeScript types
│   │   └── index.ts
│   ├── utils/               # Utility functions
│   │   ├── constants.ts
│   │   ├── helpers.ts
│   │   └── mockWeatherData.ts
│   ├── test/                # Test utilities
│   ├── App.tsx
│   ├── main.tsx
│   └── router.tsx
├── .env                     # Environment variables
├── .gitignore
├── index.html
├── package.json
├── README.md
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── vitest.config.ts
```
## 🐛 Troubleshooting

### Weather data not loading
- **Check API keys** in `.env` file
- **Restart dev server** after changing `.env`
- **Check browser console** for error messages
- **Verify API quota** - you may have hit the free tier limit

### "City not found" error
- Try spelling with country name (e.g., "Paris, France")
- Some small cities may not be in the database
- Use the GeoNames search suggestions

### Search not working
- Verify **GeoNames username** is activated (check email)
- Must be **online** to search (search disabled offline)
- Type at least **2 characters**

### Location not working
- Grant **location permission** in browser settings
- Use **HTTPS** or **localhost** (required for geolocation)
- Check browser console for permission errors

### Tests failing
- Run `npm install` to ensure all dependencies are installed
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check that you're using **Node.js 18+**

### Animations not showing
- Clear browser cache and hard reload (Ctrl/Cmd + Shift + R)
- Check that JavaScript is enabled
- Try a different browser

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

For questions or feedback, please open an issue on GitHub.

---

**Enjoy tracking the weather! 🌤️**

Made using React, TypeScript, and Tailwind CSS