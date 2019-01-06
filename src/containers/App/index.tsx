import React from 'react';

import { get } from '../../utils/request';
import Card from '../../components/Card';
import Search from '../../components/Search';
import './App.css';

interface State {
  searchCriteria: string;
  repositories: object[];
}

class App extends React.Component<{}, State> {
  state = {
    searchCriteria: '',
    repositories: [],
  };

  handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchCriteria: e.target.value });
  };

  handleSearch = async () => {
    const response = await get(
      `search/repositories?q=${this.state.searchCriteria}`,
    );
    this.setState({ repositories: response.items.slice(0, 6) });
  };

  render() {
    const { searchCriteria, repositories } = this.state;

    return (
      <div className="App">
        <header className="header">
          <Search
            handleOnChange={this.handleOnChange}
            handleSearch={this.handleSearch}
            searchCriteria={searchCriteria}
          />
        </header>
        <main className="container">
          {repositories.map((item: any) => (
            <div key={item.id} className="item">
              <Card
                title={item.full_name}
                subtitle={item.language}
                description={item.description}
                link={item.html_url}
                stars={item.stargazers_count.toLocaleString()}
                issues={item.open_issues.toLocaleString()}
              />
            </div>
          ))}
        </main>
      </div>
    );
  }
}

export default App;
