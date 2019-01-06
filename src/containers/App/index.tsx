import React from 'react';

import { get } from '../../utils/request';
import './App.css';

interface State {
  searchCriteria: string;
  repositories: object;
}

class App extends React.Component<{}, State> {
  state = {
    searchCriteria: '',
    repositories: {},
  };

  handleSearchCriteria = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchCriteria: e.target.value });
  };

  handleSearch = async () => {
    const response = await get(
      `search/repositories?q=${this.state.searchCriteria}`,
    );
    this.setState({ repositories: response });
  };

  render() {
    const { searchCriteria } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <label htmlFor="search-criteria">Search</label>
          <input
            id="search-criteria"
            type="text"
            placeholder="react:javacript"
            onChange={this.handleSearchCriteria}
            value={searchCriteria}
          />
          <button
            data-testid="search-btn"
            onClick={this.handleSearch}
            disabled={!searchCriteria}
          >
            {' '}
            Search{' '}
          </button>
        </header>
      </div>
    );
  }
}

export default App;
