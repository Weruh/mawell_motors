import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DataProvider } from "../context/DataContext.jsx";
import Admin from "./Admin";

const mockCars = [
  { id: "1", name: "Aurora Sedan", description: "A stylish sedan.", price: "KSH. 2,400,000", image: "/cars/sedan.png" },
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

function renderAdmin() {
  return render(
    <DataProvider>
      <Admin />
    </DataProvider>,
  );
}

describe("Admin page", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("creates a new car through the form", async () => {
    const user = userEvent.setup();

    getDocs.mockResolvedValueOnce(snapshotFor(mockCars));
    addDoc.mockResolvedValueOnce({ id: "2" });

    renderAdmin();
    await screen.findByText("Aurora Sedan");

    await user.type(screen.getByLabelText(/car name/i), "Nimbus Coupe");
    await user.type(screen.getByLabelText(/description/i), "A nimble coupe.");
    await user.type(screen.getByLabelText(/price/i), "KSH. 2,800,000");
    await user.type(screen.getByLabelText(/image url/i), "/cars/coupe.png");
    await user.click(screen.getByRole("button", { name: /^add car$/i }));

    expect(await screen.findByText("Nimbus Coupe")).toBeInTheDocument();
  });

  it("edits an existing car", async () => {
    const user = userEvent.setup();

    getDocs.mockResolvedValueOnce(snapshotFor(mockCars));
    updateDoc.mockResolvedValueOnce(undefined);

    renderAdmin();
    await screen.findByText("Aurora Sedan");

    await user.click(screen.getByRole("button", { name: /^edit$/i }));
    const nameInput = screen.getByLabelText(/car name/i);
    await user.clear(nameInput);
    await user.type(nameInput, "Aurora Sedan LX");
    await user.click(screen.getByRole("button", { name: /^update car$/i }));

    expect(await screen.findByText("Aurora Sedan LX")).toBeInTheDocument();
  });

  it("deletes a car", async () => {
    const user = userEvent.setup();

    getDocs.mockResolvedValueOnce(snapshotFor(mockCars));
    deleteDoc.mockResolvedValueOnce(undefined);

    renderAdmin();
    await screen.findByText("Aurora Sedan");

    await user.click(screen.getByRole("button", { name: /^delete$/i }));

    await waitFor(() => {
      expect(screen.queryByText("Aurora Sedan")).not.toBeInTheDocument();
    });
  });
});
