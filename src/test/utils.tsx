import type { ReactElement } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureStore, PreloadedState } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import weatherReducer from "../store/slices/weatherSlice";
import favoritesReducer from "../store/slices/favoritesSlice";
import notesReducer from "../store/slices/notesSlice";
import userLocationReducer from "../store/slices/userLocationSlice";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: ReturnType<typeof setupStore>;
}

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: {
      weather: weatherReducer,
      favorites: favoritesReducer,
      notes: notesReducer,
      userLocation: userLocationReducer,
    },
    preloadedState,
  });
}

export function renderWithProviders(
  ui: ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
