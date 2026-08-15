import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { DataProvider } from './context/DataContext.jsx';
import dealershipdata from './dealershipdata.js';

function renderApp(initialRoute = '/') {
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

  it('renders the dealership page with every car listed', () => {
    renderApp('/dealership');
    expect(screen.getByRole('heading', { name: /our dealership/i })).toBeInTheDocument();

    dealershipdata.forEach((car) => {
      expect(screen.getByRole('heading', { name: car.name })).toBeInTheDocument();
    });
  });

  it('renders the admin page with the add-product form and existing products', () => {
    renderApp('/admin');
    expect(screen.getByRole('heading', { name: /admin panel/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/car name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/image url/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add car/i })).toBeInTheDocument();

    expect(screen.getAllByRole('button', { name: /^edit$/i })).toHaveLength(dealershipdata.length);
  });

  it('falls back to no matching layout content for an unknown route', () => {
    renderApp('/does-not-exist');
    expect(screen.queryByRole('heading', { name: /find your/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /our dealership/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /admin panel/i })).not.toBeInTheDocument();
  });
});
