import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

import './index.scss';

const Nav = ({
  handleToggle,
  toggleValue,
  searchValue,
  handleSearch,
  respFunc,
}) => {
  return (
    <>
      <nav className="navbar topnav" id="myTopnav">
        <Link className="navbar-brand" to="/">
          Reddit
        </Link>
        <section className="nav_actions">
          <div className="search-container">
            <input
              placeholder="Search by title"
              type="text"
              value={searchValue}
              onChange={e => handleSearch(e)}
            />
          </div>
          <div className="toggle-switch">
            <p style={{ fontSize: '12px', color: '#fff', marginRight: '10px' }}>
              Sort by:
            </p>
            <span className="sort_type">Upvote</span>
            <label className="switch">
              <input
                type="checkbox"
                value={toggleValue}
                onChange={e => handleToggle(e)}
              />
              <span className="slider round"></span>
            </label>
            <span className="sort_type">DownVote</span>
          </div>
        </section>
        <Button
          basic
          inverted
          icon="bars"
          onClick={() => respFunc()}
          className="resp-btn"
        ></Button>
      </nav>
      <section className="nav_actions_resp">
        <div className="search-container">
          <input
            placeholder="Search by title"
            type="text"
            value={searchValue}
            onChange={e => handleSearch(e)}
          />
        </div>
        <div className="toggle-switch">
          <p style={{ fontSize: '12px', color: '#fff', marginRight: '10px' }}>
            Sort by:
          </p>
          <span className="sort_type">Upvote</span>
          <label className="switch">
            <input
              type="checkbox"
              value={toggleValue}
              onChange={e => handleToggle(e)}
            />
            <span className="slider round"></span>
          </label>
          <span className="sort_type">DownVote</span>
        </div>
      </section>
    </>
  );
};

export default Nav;
