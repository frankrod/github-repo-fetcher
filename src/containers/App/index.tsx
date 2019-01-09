import React from 'react';

import { get } from '../../utils/request';
import Card from '../../components/Card';
import Search from '../../components/Search';
import './App.css';
import { RouteComponentProps, navigate } from '@reach/router';

interface State {
  searchCriteria: string;
  repositories: object[];
  perPage: number;
}

class App extends React.Component<RouteComponentProps, State> {
  state: Readonly<State> = {
    searchCriteria: '',
    repositories: [],
    perPage: 6,
  };

  handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchCriteria: e.target.value });
  };

  handleSearch = async () => {
    const { searchCriteria, perPage } = this.state;
    const response = await get(
      `search/repositories?q=${searchCriteria}&per_page=${perPage}`,
    );
    this.setState({ repositories: response.items });
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
                contributorsUrl={item.contributors_url}
              />
            </div>
          ))}
        </main>
      </div>
    );
  }
}

export default App;
