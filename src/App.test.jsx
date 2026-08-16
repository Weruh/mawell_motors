import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { DataProvider } from './context/DataContext.jsx';

const seedCars = [
  { id: '1', name: 'Aurora Sedan', description: 'A stylish sedan.', price: 'KSH. 2,400,000', image: '/cars/sedan.png' },
  { id: '2', name: 'Horizon SUV', description: 'A spacious SUV.', price: 'KSH. 3,200,000', image: '/cars/suv.png' },
];

const { getDocs, addDoc, updateDoc, deleteDoc, collection, doc } = vi.hoisted(() => ({
  getDocs: vi.fn(),
  addDoc: vi.fn(),
  updateDoc: vi.fn(),
  deleteDoc: vi.fn(),
  collection: vi.fn(() => 'carsCollection'),
  doc: vi.fn((_db, _col, id) => id),
}));

vi.mock('firebase/firestore', () => ({ getDocs, addDoc, updateDoc, deleteDoc, collection, doc }));
vi.mock('./firebase.js', () => ({ db: {} }));

function renderApp(initialRoute = '/') {
  getDocs.mockResolvedValue({
    docs: seedCars.map(({ id, ...data }) => ({ id, data: () => data })),
  });

  return render(
    <DataProvider>
      <MemoryRouter initialEntries={[initialRoute]}>
        <App />
      </MemoryRouter>
    </DataProvider>,
  );
}

describe('Sample Test Suite', () => {
  it('should pass a basic assertion', () => {
    expect(1 + 1).toBe(2);
  });
});

describe('App routing', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the navbar on every route', () => {
    renderApp('/');
    expect(screen.getByRole('link', { name: /mawel motors/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /dealership/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /admin panel/i })).toBeInTheDocument();
  });

  it('renders the home page at "/"', () => {
    renderApp('/');
    expect(screen.getByRole('heading', { name: /find your/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /view cars/i })).toBeInTheDocument();
  });

  it('renders the dealership page with every car fetched from the server', async () => {
    renderApp('/dealership');
    expect(screen.getByRole('heading', { name: /our dealership/i })).toBeInTheDocument();

    for (const car of seedCars) {
      expect(await screen.findByRole('heading', { name: car.name })).toBeInTheDocument();
    }
  });

  it('renders the admin page with the add-product form and existing products', async () => {
    renderApp('/admin');
    expect(screen.getByRole('heading', { name: /admin panel/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/car name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/image url/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add car/i })).toBeInTheDocument();

    expect(await screen.findAllByRole('button', { name: /^edit$/i })).toHaveLength(seedCars.length);
    expect(screen.getAllByRole('button', { name: /^delete$/i })).toHaveLength(seedCars.length);
  });

  it('falls back to no matching layout content for an unknown route', () => {
    renderApp('/does-not-exist');
    expect(screen.queryByRole('heading', { name: /find your/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /our dealership/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /admin panel/i })).not.toBeInTheDocument();
  });
});
