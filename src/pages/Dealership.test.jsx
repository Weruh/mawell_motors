import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { DataProvider } from "../context/DataContext.jsx";
import Dealership from "./Dealership";

const mockCars = [
  { id: 1, name: "Aurora Sedan", description: "A stylish sedan.", price: "KSH. 2,400,000", image: "/cars/sedan.png" },
  { id: 2, name: "Horizon SUV", description: "A spacious SUV.", price: "KSH. 3,200,000", image: "/cars/suv.png" },
];

describe("Dealership page", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("shows a loading state and then every car fetched from the server", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockCars),
    });

    render(
      <DataProvider>
        <Dealership />
      </DataProvider>,
    );

    expect(screen.getByText(/loading cars/i)).toBeInTheDocument();

    expect(await screen.findByRole("heading", { name: "Aurora Sedan" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Horizon SUV" })).toBeInTheDocument();
  });

  it("shows an error message when the request fails", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("network error"));

    render(
      <DataProvider>
        <Dealership />
      </DataProvider>,
    );

    expect(await screen.findByText(/failed to load cars/i)).toBeInTheDocument();
  });
});
