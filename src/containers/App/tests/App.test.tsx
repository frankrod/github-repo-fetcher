import 'jest-dom/extend-expect';
import React from 'react';
import { render, fireEvent, wait } from 'react-testing-library';
import { get as mockGet } from '../../../utils/request';
import App from '..';

jest.mock('../../../utils/request', () => {
  return {
    get: jest.fn(() => {
      return Promise.resolve({
        items: [
          {
            id: '1',
            full_name: 'repo full name',
            language: 'java',
            description: 'some desc',
            html_url: 'https://test.com',
            stargazers_count: 10,
            open_issues: 15,
          },
        ],
      });
    }),
  };
});

test('When click on search and search criteria is filled in it should fetch with search criteria and show card with content', async () => {
  const { getByPlaceholderText, getByTestId, getByText } = render(<App />);

  const searchInput = getByPlaceholderText(/search github repos/i);
  const searchButton = getByTestId('search-btn');

  fireEvent.click(searchButton);
  expect(mockGet).toHaveBeenCalledTimes(0);
  expect(searchButton).toHaveAttribute('disabled');

  fireEvent.change(searchInput, { target: { value: 'react' } });
  fireEvent.click(searchButton);

  await wait(() => {
    expect(getByText('repo full name')).toBeDefined();
    expect(getByText('java')).toBeDefined();
    expect(getByText('some desc')).toBeDefined();
    expect(getByText('10')).toBeDefined();
    expect(getByText('15')).toBeDefined();
  });
  expect(searchButton).not.toHaveAttribute('disabled');
  expect(mockGet).toHaveBeenCalledTimes(1);
  expect(mockGet).toHaveBeenCalledWith(
    'search/repositories?q=react&per_page=6',
  );
});
