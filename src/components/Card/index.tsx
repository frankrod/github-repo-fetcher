import React from 'react';
import { GoStar, GoIssueOpened } from 'react-icons/go';

import './Card.css';

interface Props {
  title: string;
  subtitle: string;
  description: string;
  link: string;
  stars: number;
  issues: number;
}

const Card: React.FunctionComponent<Props> = ({
  title,
  subtitle,
  description,
  link,
  stars,
  issues,
}) => (
  <div className="card-container">
    <a className="repository-name" href={link}>
      {title}
    </a>
    <p className="repository-language"> {subtitle} </p>
    <p className="repository-description">{description}</p>
    <a className="repository-contributors" href="#">
      Top contributors
    </a>
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
