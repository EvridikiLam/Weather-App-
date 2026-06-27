import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "../components/SearchBar";

describe("SearchBar", () => {
  test("renders input and button", () => {
    render(<SearchBar onSearch={() => {}} />);

    expect(screen.getByPlaceholderText("Search for a city...")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
  });

  test("calls onSearch with city name when submitted", async () => {
    const mockSearch = vi.fn();
    render(<SearchBar onSearch={mockSearch} />);

    const input = screen.getByPlaceholderText("Search for a city...");
    const button = screen.getByRole("button", { name: /search/i });

    await userEvent.type(input, "London");
    await userEvent.click(button);

    expect(mockSearch).toHaveBeenCalledWith("London");
  });

  test("does not call onSearch when input is empty", async () => {
    const mockSearch = vi.fn();
    render(<SearchBar onSearch={mockSearch} />);

    const button = screen.getByRole("button", { name: /search/i });
    await userEvent.click(button);

    expect(mockSearch).not.toHaveBeenCalled();
  });

  test("clears input after search", async () => {
    render(<SearchBar onSearch={() => {}} />);

    const input = screen.getByPlaceholderText("Search for a city...");
    await userEvent.type(input, "Paris");
    await userEvent.click(screen.getByRole("button", { name: /search/i }));

    expect(input).toHaveValue("");
  });
});