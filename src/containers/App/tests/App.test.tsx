import 'jest-dom/extend-expect';
import React from 'react';
import { render, fireEvent, wait } from 'react-testing-library';
import { get as mockGet } from '../../../utils/request';
import App from '..';

jest.mock('../../../utils/request', () => {
  return {
    get: jest.fn(() => {
      Promise.resolve({ items: [{}] });
    }),
  };
});

test('When click on search and search criteria is filled in it should fetch with search criteria', async () => {
  const { getByLabelText, getByTestId } = render(<App />);
  const searchInput = getByLabelText(/search/i);
  const searchButton = getByTestId('search-btn');

  fireEvent.click(searchButton);
  expect(mockGet).toHaveBeenCalledTimes(0);
  expect(searchButton).toHaveAttribute('disabled');

  fireEvent.change(searchInput, { target: { value: 'react' } });
  fireEvent.click(searchButton);

  expect(searchButton).not.toHaveAttribute('disabled');
  expect(mockGet).toHaveBeenCalledTimes(1);
  expect(mockGet).toHaveBeenCalledWith('search/repositories?q=react');
});
