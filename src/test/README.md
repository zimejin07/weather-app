# Testing Guide

This project uses Vitest and React Testing Library for comprehensive testing.

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- helpers.test.ts

# Run tests matching a pattern
npm test -- --grep="favorites"
```

## Test Structure

```
src/
├── test/
│   ├── setup.ts              # Test environment setup
│   ├── utils.tsx             # Test utilities (renderWithProviders)
│   ├── mockData.ts           # Mock data for tests
│   ├── integration/          # Integration tests
│   └── README.md             # This file
├── utils/__tests__/          # Unit tests for utilities
├── services/__tests__/       # Unit tests for services
├── store/slices/__tests__/   # Unit tests for Redux slices
└── components/__tests__/     # Component tests
```

## Test Coverage

Current test coverage includes:

### Unit Tests

- ✅ Helper functions (generateCityId, sortCities, formatTemperature, etc.)
- ✅ Redux slices (weather, favorites, notes, userLocation)
- ✅ Storage service (localStorage operations)

### Component Tests

- ✅ CityCard - rendering, interactions, favorites
- ✅ SearchBar - search, suggestions, city selection
- ✅ HomePage (partial)
- ⏳ CityDetailsPage (to be added)
- ⏳ Navbar (to be added)

### Integration Tests

- ✅ Favorites flow (add, remove, persist)
- ⏳ Search and add city flow (to be added)
- ⏳ Notes CRUD flow (to be added)

## Writing New Tests

### Unit Test Example

\`\`\`typescript
import { describe, it, expect } from 'vitest';
import { myFunction } from '../myFile';

describe('myFunction', () => {
it('should do something', () => {
const result = myFunction('input');
expect(result).toBe('expected output');
});
});
\`\`\`

### Component Test Example

\`\`\`typescript
import { describe, it, expect } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../test/utils';
import MyComponent from '../MyComponent';

describe('MyComponent', () => {
it('should render correctly', () => {
renderWithProviders(<MyComponent />);
expect(screen.getByText('Hello')).toBeInTheDocument();
});

it('should handle click', () => {
renderWithProviders(<MyComponent />);
const button = screen.getByRole('button');
fireEvent.click(button);
expect(screen.getByText('Clicked')).toBeInTheDocument();
});
});
\`\`\`

### Testing with Redux State

\`\`\`typescript
const preloadedState = {
weather: {
cities: {},
loading: false,
error: null,
},
favorites: {
favoriteIds: ['tokyo_japan'],
},
};

const { store } = renderWithProviders(<MyComponent />, { preloadedState });

// Check state after interaction
const state = store.getState();
expect(state.favorites.favoriteIds).toContain('new_city_id');
\`\`\`

## Mocking

### Mock API Services

\`\`\`typescript
import { vi } from 'vitest';
import { weatherAPI } from '../services/weatherAPI';

vi.mock('../services/weatherAPI');

// In your test
vi.mocked(weatherAPI.fetchWeatherByCity).mockResolvedValue(mockCityWeather);
\`\`\`

### Mock localStorage

localStorage is automatically mocked in `setup.ts` and cleared before each test.

### Mock Navigator APIs

\`\`\`typescript
// Mock online/offline
Object.defineProperty(global.navigator, 'onLine', {
writable: true,
value: false, // or true
});

// Mock geolocation
const mockGeolocation = {
getCurrentPosition: vi.fn((success) =>
success({ coords: { latitude: 35.6895, longitude: 139.6917 } })
),
};

Object.defineProperty(global.navigator, 'geolocation', {
writable: true,
value: mockGeolocation,
});
\`\`\`

## Best Practices

1. **Arrange-Act-Assert**: Structure tests clearly
2. **One assertion per test**: Keep tests focused
3. **Use descriptive test names**: "should do X when Y"
4. **Clean up**: Reset mocks and state between tests
5. **Test user behavior**: Not implementation details
6. **Mock external dependencies**: APIs, localStorage, etc.

## Coverage Goals

- Aim for >80% code coverage
- 100% coverage for critical paths (data persistence, favorites, notes)
- Focus on user flows over implementation details

## Debugging Tests

```bash
# Run tests with verbose output
npm test -- --reporter=verbose

# Run single test file in watch mode
npm test -- CityCard.test.tsx --watch

# Debug with UI
npm run test:ui
```

## CI/CD Integration

Add to your CI pipeline:

\`\`\`yaml

- name: Run tests
  run: npm test

- name: Generate coverage
  run: npm run test:coverage

- name: Upload coverage
  uses: codecov/codecov-action@v3
  \`\`\`
