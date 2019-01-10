import React from 'react';
import { render, wait, fireEvent } from 'react-testing-library';
import {
  Router,
  LocationProvider,
  createMemorySource,
  createHistory,
} from '@reach/router';
import { getWithHeaders as mockGetWithHeaders } from '../../../utils/request';
import Contributors from '..';

jest.mock('../../../utils/request', () => {
  const link =
    '<https://api.github.com/user/repos?page=3&per_page=10>; rel="next",\
<https://api.github.com/user/repos?page=50&per_page=10>; rel="last"';

  const contributors = [
    {
      id: '1',
      avatar_url: 'avatar',
      login: 'username',
      html_url: 'github-profile',
      contributions: 100,
    },
  ];

  return {
    getWithHeaders: jest.fn(() => {
      return Promise.resolve({
        headers: {
          get: () => {
            return link;
          },
        },
        json: () => contributors,
      });
    }),
  };
});

afterEach(() => {
  jest.clearAllMocks();
});

function renderWithRouter(ui: React.ReactChild, options?: any) {
  const source = createMemorySource(options.path);
  source.history.replaceState(
    { contributorsUrl: 'http://api.github.com/contributors' },
    'Contributors',
    options.path,
  );
  const history = createHistory(source);
  return render(
    <LocationProvider history={history}>
      <Router>{ui}</Router>
    </LocationProvider>,
  );
}

test('When component has been mounted it should render contributors', async () => {
  const { getByText } = renderWithRouter(
    <Contributors path="/contributors" />,
    {
      path: '/contributors',
    },
  );

  await wait(() => {
    expect(getByText('username')).toBeDefined();
    expect(100).toBeDefined();
  });

  expect(mockGetWithHeaders).toHaveBeenCalledTimes(1);
  expect(mockGetWithHeaders).toHaveBeenCalledWith(
    'http://api.github.com/contributors?per_page=10&anon=false',
  );
});

test('When click on load more should render more contributors', async () => {
  const { getByText } = renderWithRouter(
    <Contributors path="/contributors" />,
    {
      path: '/contributors',
    },
  );
  const loadMoreButton = getByText(/load more/i);
  fireEvent.click(loadMoreButton);
  expect(mockGetWithHeaders).toHaveBeenCalledTimes(2);
  expect(mockGetWithHeaders).toHaveBeenCalledWith(
    'https://api.github.com/user/repos?page=3&per_page=5',
  );
});
