import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "./Home";

describe("Home page", () => {
  it("renders the hero heading and a link to the dealership", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: /find your/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /view cars/i })).toHaveAttribute("href", "/dealership");
  });
});
