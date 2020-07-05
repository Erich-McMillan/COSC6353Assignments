import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

test('renders Login link', () => {
  const { getByText } = render(<Router><App /></Router>);
  const linkElement = getByText(/Login/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders learn Profile link', () => {
  const { getByText } = render(<Router><App /></Router>);
  const linkElement = getByText(/Profile/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders learn FuelQuote link', () => {
  const { getByText } = render(<Router><App /></Router>);
  const linkElement = getByText(/FuelQuote/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders learn QuoteHistory link', () => {
  const { getByText } = render(<Router><App /></Router>);
  const linkElement = getByText(/QuoteHistory/i);
  expect(linkElement).toBeInTheDocument();
});