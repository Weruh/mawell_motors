import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DataProvider, useData } from "./DataContext.jsx";

const mockCars = [
  { id: 1, name: "Aurora Sedan", description: "A stylish sedan.", price: "KSH. 2,400,000", image: "/cars/sedan.png" },
];

function Consumer() {
  const { product, loading, error, AddProduct, EditProduct, DeleteProduct } = useData();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <ul>
        {product.map((car) => (
          <li key={car.id}>{car.name} — {car.price}</li>
        ))}
      </ul>
      <button onClick={() => AddProduct("Nimbus Coupe", "desc", "KSH. 2,800,000", "/cars/coupe.png")}>
        add
      </button>
      <button
        onClick={() =>
          EditProduct(1, { name: "Aurora Sedan LX", description: "desc", price: "KSH. 2,500,000", imageUrl: "/cars/sedan.png" })
        }
      >
        edit
      </button>
      <button onClick={() => DeleteProduct(1)}>delete</button>
    </div>
  );
}

function renderConsumer() {
  return render(
    <DataProvider>
      <Consumer />
    </DataProvider>,
  );
}

describe("DataContext CRUD", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("reads products from the server on mount", async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve(mockCars) });

    renderConsumer();

    expect(await screen.findByText(/Aurora Sedan — KSH\. 2,400,000/)).toBeInTheDocument();
  });

  it("creates a product via POST", async () => {
    const user = userEvent.setup();

    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockCars) })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ id: 2, name: "Nimbus Coupe", description: "desc", price: "KSH. 2,800,000", image: "/cars/coupe.png" }),
      });

    renderConsumer();
    await screen.findByText(/Aurora Sedan/);

    await user.click(screen.getByText("add"));

    expect(await screen.findByText(/Nimbus Coupe/)).toBeInTheDocument();
  });

  it("updates a product via PATCH", async () => {
    const user = userEvent.setup();

    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockCars) })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ id: 1, name: "Aurora Sedan LX", description: "desc", price: "KSH. 2,500,000", image: "/cars/sedan.png" }),
      });

    renderConsumer();
    await screen.findByText(/Aurora Sedan/);

    await user.click(screen.getByText("edit"));

    expect(await screen.findByText(/Aurora Sedan LX/)).toBeInTheDocument();
  });

  it("removes a product via DELETE", async () => {
    const user = userEvent.setup();

    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockCars) })
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({}) });

    renderConsumer();
    await screen.findByText(/Aurora Sedan/);

    await user.click(screen.getByText("delete"));

    await waitFor(() => {
      expect(screen.queryByText(/Aurora Sedan/)).not.toBeInTheDocument();
    });
  });
});
