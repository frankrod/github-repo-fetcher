import React from 'react';
import { GoStar, GoIssueOpened } from 'react-icons/go';
import { Link } from '@reach/router';

import './Card.css';

interface Props {
  title: string;
  subtitle: string;
  description: string;
  link: string;
  stars: number;
  issues: number;
  contributorsUrl: string;
}

const Card: React.FunctionComponent<Props> = ({
  title,
  subtitle,
  description,
  link,
  stars,
  issues,
  contributorsUrl,
}) => (
  <div className="card-container">
    <a className="repository-name" href={link}>
      {title}
    </a>
    <p className="repository-language"> {subtitle} </p>
    <p className="repository-description">{description}</p>
    <Link
      className="repository-contributors"
      to="/contributors"
      state={{ contributorsUrl, repoName: title }}
    >
      Top contributors
    </Link>
    <div className="card-footer">
      <span style={{ marginLeft: 10 }}>
        <GoStar style={{ verticalAlign: 'bottom' }} /> {stars}
      </span>
      <span style={{ marginRight: 10 }}>
        <GoIssueOpened style={{ verticalAlign: 'bottom' }} /> {issues}
      </span>
    </div>
  </div>
);

export default Card;
