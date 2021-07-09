import React from 'react';
import { Link } from 'react-router-dom';
import '../css/TopNav.css';

const TopNav = () => {
  return (
    <nav className="topNav">
      <ul>
        <li>
          <Link to="/">GitHub Search</Link>
        </li>
        {/* <li>
          <Link>Results</Link>
        </li> */}
      </ul>
    </nav>
  );
};

export default TopNav;
