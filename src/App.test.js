import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the Articles header', () => {
  render(<App />);
  const headerElement = screen.getByRole('heading', { name: /Articles/i });
  expect(headerElement).toBeInTheDocument();
});

test('renders Add Article button', () => {
  render(<App />);
  const addButton = screen.getByText(/Add Article/i);
  expect(addButton).toBeInTheDocument();
});

test('renders Show Articles button', () => {
  render(<App />);
  const showButton = screen.getByText(/Show Articles/i);
  expect(showButton).toBeInTheDocument();
});

