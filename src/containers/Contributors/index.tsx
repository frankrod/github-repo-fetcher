import React from 'react';
import { RouteComponentProps } from '@reach/router';
import parseLinkHeader from 'parse-link-header';

import './Contributors.css';
import TopContributorsCard from '../../components/TopContributorsCard';
import { getWithHeaders } from '../../utils/request';

export interface ContributorsType {
  id: string;
  avatar_url: string;
  login: string;
  html_url: string;
  contributions: number;
}

export interface State {
  contributors: ContributorsType[];
  parsed: parseLinkHeader.Links;
  lastPage: number;
  nextPage: number;
  perPage: number;
  loadMorePerPage: number;
  seeAnonContributors: boolean;
}

class Contributors extends React.Component<RouteComponentProps, State> {
  state: Readonly<State> = {
    contributors: [],
    parsed: {},
    lastPage: 0,
    nextPage: 0,
    perPage: 10,
    loadMorePerPage: 5,
    seeAnonContributors: true,
  };

  async componentDidMount() {
    const { location } = this.props;
    const { perPage, seeAnonContributors } = this.state;

    if (!location) return;

    this.fetchContributors(
      `${
        location.state.contributorsUrl
      }?per_page=${perPage}&anon=${seeAnonContributors}`,
    );
  }

  async fetchContributors(url: string) {
    const response = await getWithHeaders(url);
    const linkHeader = response.headers.get('Link');
    const contributors: ContributorsType[] = await response.json();
    console.log(contributors);
    if (!linkHeader) {
      this.setState(prevState => ({
        contributors: [...prevState.contributors, ...contributors],
      }));
    } else {
      const parsed = parseLinkHeader(linkHeader);

      if (!parsed) return;

      const lastPage = parsed.last.page;
      const nextPage = parsed.next.page;

      this.setState(prevState => ({
        contributors: [...prevState.contributors, ...contributors],
        lastPage: parseInt(lastPage),
        nextPage: parseInt(nextPage),
        parsed,
      }));
    }
  }

  handleLoadMore = async () => {
    const { parsed, loadMorePerPage } = this.state;
    const url = parsed.next.url.replace(
      'per_page=10',
      `per_page=${loadMorePerPage}`,
    );

    this.fetchContributors(url);
  };

  render() {
    const { contributors, nextPage, lastPage } = this.state;

    return (
      <section className="top-contributors-container">
        <h1> Top 10 Contributors for Repo Name </h1>
        {contributors.map(contributor => (
          <TopContributorsCard key={contributor.id} contributor={contributor} />
        ))}
        {lastPage !== nextPage && (
          <button className="load-more-button" onClick={this.handleLoadMore}>
            {' '}
            Load more{' '}
          </button>
        )}
      </section>
    );
  }
}

export default Contributors;
