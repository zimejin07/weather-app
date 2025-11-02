# Weather App

A modern, responsive weather application built with React, TypeScript, and Redux Toolkit. Track weather conditions for cities worldwide with offline support and personalized favorites.

## Features

- 🌍 **Global Weather Data**: View current weather for 15 major cities by default
- 🔍 **City Search**: Search and add any city worldwide
- ⭐ **Favorites**: Mark cities as favorites for quick access
- 📝 **Weather Notes**: Add and save personal notes for each city
- 📍 **User Location**: Get weather for your current location
- 💾 **Offline Support**: Access cached weather data when offline
- 🎨 **Modern UI**: Clean, responsive design with Tailwind CSS
- ⚡ **Optimized Performance**: Efficient data caching and rendering

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Redux Toolkit** - State management
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **Axios** - HTTP client

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Free API keys from:
  - [Weatherstack](https://weatherstack.com/) - Weather data
  - [GeoNames](https://www.geonames.org/) - City search

## Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd weather-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```bash
   VITE_WEATHERSTACK_API_KEY=your_weatherstack_api_key
   VITE_GEONAMES_USERNAME=your_geonames_username
   ```

   To get your API keys:

   - **Weatherstack**: Sign up at https://weatherstack.com/ (free tier available)
   - **GeoNames**: Register at https://www.geonames.org/login (free account)

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to `http://localhost:5173`

## Building for Production

```bash
npm run build
```

The optimized production build will be in the `dist` folder.

To preview the production build locally:

```bash
npm run preview
```

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── CityCard.tsx
│   ├── Navbar.tsx
│   └── SearchBar.tsx
├── pages/             # Page components
│   ├── HomePage.tsx
│   ├── CityDetailsPage.tsx
│   └── UserLocationPage.tsx
├── store/             # Redux store and slices
│   ├── slices/
│   │   ├── weatherSlice.ts
│   │   ├── favoritesSlice.ts
│   │   ├── notesSlice.ts
│   │   └── userLocationSlice.ts
│   ├── hooks.ts
│   └── index.ts
├── services/          # API services
│   ├── weatherAPI.ts
│   ├── geoAPI.ts
│   └── storage.ts
├── types/             # TypeScript types
│   └── index.ts
├── utils/             # Utility functions
│   ├── constants.ts
│   └── helpers.ts
├── App.tsx
├── main.tsx
└── router.tsx
```

## Usage

### Viewing Weather

- The home page displays weather for 15 major cities
- Click on any city card to view detailed weather information

### Searching for Cities

- Use the search bar at the top of the home page
- Type at least 2 characters to see suggestions
- Click on a suggestion to add it to your list

### Managing Favorites

- Click the "☆ Favorite" button on any city card
- Favorite cities appear at the top of the list
- Click "★ Favorited" to remove from favorites

### Adding Notes

- Navigate to a city's detail page
- Use the "Weather Notes" section to add observations
- Notes are saved automatically to localStorage

### Using Your Location

- Click "My Location" in the navigation
- Grant location permission when prompted
- View weather for your current location

### Offline Mode

- The app automatically detects when you're offline
- Cached weather data remains accessible
- Search functionality is disabled offline

## Features Explained

### Data Caching

- Weather data is cached for 30 minutes
- All data persists in localStorage
- Automatic cache invalidation and refresh

### State Management

- Redux Toolkit for centralized state
- Separate slices for weather, favorites, notes, and location
- Optimized selectors for performance

### Responsive Design

- Mobile-first approach
- Adapts to all screen sizes
- Touch-friendly interactions

## API Rate Limits

**Important**: Free tier APIs have rate limits:

- **Weatherstack**: 100 requests/month on free tier
- **GeoNames**: 20,000 requests/day on free tier

### Managing API Quota

The app implements several strategies to conserve your API quota:

1. **Aggressive Caching**: Weather data is cached for 30 minutes
2. **No Auto-Refresh**: Cities are loaded from cache on startup
3. **Manual Refresh**: Use "Refresh All" button only when needed
4. **Mock Data Mode**: Use mock data during development

### Using Mock Data

To avoid exhausting your API quota during development:

**Option 1: Set environment variable**

```bash
# In .env file
VITE_USE_MOCK_DATA=true
```

**Option 2: Load mock data from UI**

- On first load, click "📊 Load Mock Data (Free)" button
- This generates realistic fake weather data
- No API calls are made

**Option 3: Use cached data**

- The app automatically loads cached data on startup
- Only refresh when you need updated weather

### API Quota Tips

- Each "Refresh All" uses **15 API requests**
- Searching and adding cities uses **1 request per city**
- Individual city refresh uses **1 request**
- With 100 requests/month, you can refresh all cities ~6 times
- Use mock data for testing and development

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### "City not found" error

- Check if the city name is spelled correctly
- Try searching with country name (e.g., "Paris, France")

### Weather not updating

- Check your internet connection
- Verify API keys are correct in `.env`
- Check browser console for errors

### Location not working

- Ensure location permission is granted in browser settings
- Try using HTTPS (required for geolocation)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Weather data provided by [Weatherstack](https://weatherstack.com/)
- City data provided by [GeoNames](https://www.geonames.org/)
- Icons from [Heroicons](https://heroicons.com/)

## Contact

For questions or feedback, please open an issue on GitHub.
