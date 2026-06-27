import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import WeatherCard from "../components/WeatherCard";

const mockData = {
  name: "London",
  sys: { country: "GB" },
  weather: [{ description: "overcast clouds", icon: "04d" }],
  main: { temp: 30, humidity: 49 },
  wind: { speed: 2.24 },
};

describe("WeatherCard", () => {
  test("renders city name and country", () => {
    render(
      <WeatherCard
        data={mockData}
        unit="metric"
        onToggleUnit={() => {}}
        onAddFavorite={() => {}}
        isFavorite={false}
        onViewDetails={() => {}}
      />
    );

    expect(screen.getByText(/London, GB/i)).toBeInTheDocument();
  });

  test("displays temperature in Celsius", () => {
    render(
      <WeatherCard
        data={mockData}
        unit="metric"
        onToggleUnit={() => {}}
        onAddFavorite={() => {}}
        isFavorite={false}
        onViewDetails={() => {}}
      />
    );

    expect(screen.getByText(/30.*°C/i)).toBeInTheDocument();
  });

  test("displays temperature in Fahrenheit when unit is imperial", () => {
    render(
      <WeatherCard
        data={mockData}
        unit="imperial"
        onToggleUnit={() => {}}
        onAddFavorite={() => {}}
        isFavorite={false}
        onViewDetails={() => {}}
      />
    );

    expect(screen.getByText(/86.*°F/i)).toBeInTheDocument();
  });

  test("calls onToggleUnit when toggle button is clicked", async () => {
    const mockToggle = vi.fn();
    render(
      <WeatherCard
        data={mockData}
        unit="metric"
        onToggleUnit={mockToggle}
        onAddFavorite={() => {}}
        isFavorite={false}
        onViewDetails={() => {}}
      />
    );

    await userEvent.click(screen.getByRole("button", { name: /switch to/i }));
    expect(mockToggle).toHaveBeenCalled();
  });

  test("calls onAddFavorite when add button is clicked", async () => {
    const mockAdd = vi.fn();
    render(
      <WeatherCard
        data={mockData}
        unit="metric"
        onToggleUnit={() => {}}
        onAddFavorite={mockAdd}
        isFavorite={false}
        onViewDetails={() => {}}
      />
    );

    await userEvent.click(screen.getByRole("button", { name: /add to favorites/i }));
    expect(mockAdd).toHaveBeenCalledWith("London");
  });
});