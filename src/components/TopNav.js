import React from 'react';
import { Link } from 'react-router-dom';
import '../css/TopNav.css';

const TopNav = () => {
  return (
    <nav className="topNav">
      <ul>
        <Link to="/">GitHub Search</Link>
        <li>Results</li>
      </ul>
    </nav>
  );
};

export default TopNav;
