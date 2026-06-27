import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Home from "../pages/Home";

// Mock the API service
vi.mock("../services/weatherApi", () => ({
  fetchWeatherByCity: vi.fn(),
}));

import { fetchWeatherByCity } from "../services/weatherApi";

const mockWeatherData = {
  name: "London",
  sys: { country: "GB" },
  weather: [{ description: "overcast clouds", icon: "04d" }],
  main: { temp: 30, humidity: 49 },
  wind: { speed: 2.24 },
};

describe("Home Page", () => {
  test("renders search bar on load", () => {
    render(<Home />, { wrapper: MemoryRouter });
    expect(screen.getByPlaceholderText("Search for a city...")).toBeInTheDocument();
  });

  test("shows loading state while fetching", async () => {
    fetchWeatherByCity.mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve(mockWeatherData), 500))
    );

    render(<Home />, { wrapper: MemoryRouter });

    await userEvent.type(screen.getByPlaceholderText("Search for a city..."), "London");
    await userEvent.click(screen.getByRole("button", { name: /search/i }));

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("displays weather data after successful search", async () => {
    fetchWeatherByCity.mockResolvedValue(mockWeatherData);

    render(<Home />, { wrapper: MemoryRouter });

    await userEvent.type(screen.getByPlaceholderText("Search for a city..."), "London");
    await userEvent.click(screen.getByRole("button", { name: /search/i }));

    await waitFor(() => {
      expect(screen.getByText(/London, GB/i)).toBeInTheDocument();
    });
  });

  test("shows error message when city is not found", async () => {
    fetchWeatherByCity.mockRejectedValue(new Error("City not found. Please check the name and try again."));

    render(<Home />, { wrapper: MemoryRouter });

    await userEvent.type(screen.getByPlaceholderText("Search for a city..."), "fakecity123");
    await userEvent.click(screen.getByRole("button", { name: /search/i }));

    await waitFor(() => {
      expect(screen.getByText(/city not found/i)).toBeInTheDocument();
    });
  });
});