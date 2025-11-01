import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import type { RootState, AppDispatch } from "./index";

// Use `useAppDispatch` and `useAppSelector` instead of plain
// `useDispatch` and `useSelector` to benefit from type safety.
// This ensures actions and state are properly typed, reducing errors.
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
