import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "./Navbar";

describe("Navbar", () => {
  it("renders the logo and links to every route", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    expect(screen.getByRole("link", { name: /mawel motors/i })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: /dealership/i })).toHaveAttribute("href", "/dealership");
    expect(screen.getByRole("link", { name: /admin panel/i })).toHaveAttribute("href", "/admin");
  });
});
