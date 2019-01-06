import React from 'react';

import './Search.css';

interface Props {
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearch: () => void;
  searchCriteria: string;
}

const Search: React.FunctionComponent<Props> = ({
  handleOnChange,
  handleSearch,
  searchCriteria,
}) => (
  <>
    <input
      id="search-criteria"
      type="text"
      placeholder="Search Github Repos"
      onChange={handleOnChange}
      value={searchCriteria}
    />
    <button
      data-testid="search-btn"
      onClick={handleSearch}
      disabled={!searchCriteria}
    >
      {' '}
      Go!{' '}
    </button>
  </>
);

export default Search;
