import React from 'react';
import { ContributorsType } from '../../containers/Contributors';
import './TopContributorsCard.css';

export interface Props {
  contributor: ContributorsType;
}

const TopContributorsCard: React.FunctionComponent<Props> = ({
  contributor,
}) => (
  <div className="top-contributors-card">
    <img
      className="card-avatar"
      src={contributor.avatar_url}
      alt="No avatar :( Anonymous User maybe?"
    />
    <a className="top-contributors-username" href={contributor.html_url}>
      {contributor.login}
    </a>
    <span className="top-contributors-contributions">
      ({contributor.contributions.toLocaleString()} - contributions)
    </span>
  </div>
);

export default TopContributorsCard;
