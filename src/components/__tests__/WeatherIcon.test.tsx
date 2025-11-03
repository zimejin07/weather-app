import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import WeatherIcon from "../WeatherIcon";

describe("WeatherIcon", () => {
  it("should render sunny icon", () => {
    const { container } = render(<WeatherIcon condition="Sunny" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("should render rainy icon", () => {
    const { container } = render(<WeatherIcon condition="Rainy" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("should render cloudy icon", () => {
    const { container } = render(<WeatherIcon condition="Cloudy" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("should handle partly cloudy condition", () => {
    const { container } = render(<WeatherIcon condition="Partly Cloudy" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("should handle different sizes", () => {
    const { container: small } = render(
      <WeatherIcon condition="Sunny" size="sm" />
    );
    const { container: medium } = render(
      <WeatherIcon condition="Sunny" size="md" />
    );
    const { container: large } = render(
      <WeatherIcon condition="Sunny" size="lg" />
    );

    expect(small.querySelector(".w-12")).toBeInTheDocument();
    expect(medium.querySelector(".w-16")).toBeInTheDocument();
    expect(large.querySelector(".w-24")).toBeInTheDocument();
  });

  it("should render default icon for unknown condition", () => {
    const { container } = render(<WeatherIcon condition="Unknown" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });
});
