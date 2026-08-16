import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { DataProvider } from "../context/DataContext.jsx";
import Dealership from "./Dealership";

const mockCars = [
  { id: "1", name: "Aurora Sedan", description: "A stylish sedan.", price: "KSH. 2,400,000", image: "/cars/sedan.png" },
  { id: "2", name: "Horizon SUV", description: "A spacious SUV.", price: "KSH. 3,200,000", image: "/cars/suv.png" },
];

const { getDocs, addDoc, updateDoc, deleteDoc, collection, doc } = vi.hoisted(() => ({
  getDocs: vi.fn(),
  addDoc: vi.fn(),
  updateDoc: vi.fn(),
  deleteDoc: vi.fn(),
  collection: vi.fn(() => "carsCollection"),
  doc: vi.fn((_db, _col, id) => id),
}));

vi.mock("firebase/firestore", () => ({ getDocs, addDoc, updateDoc, deleteDoc, collection, doc }));
vi.mock("../firebase.js", () => ({ db: {} }));

function snapshotFor(cars) {
  return { docs: cars.map(({ id, ...data }) => ({ id, data: () => data })) };
}

describe("Dealership page", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("shows a loading state and then every car fetched from Firestore", async () => {
    getDocs.mockResolvedValue(snapshotFor(mockCars));

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
    getDocs.mockRejectedValue(new Error("network error"));

    render(
      <DataProvider>
        <Dealership />
      </DataProvider>,
    );

    expect(await screen.findByText(/failed to load cars/i)).toBeInTheDocument();
  });
});
