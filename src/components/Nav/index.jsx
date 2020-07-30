import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';

import './index.scss';

const Nav = ({
  handleToggle,
  toggleValue,
  searchValue,
  handleSearch,
  respFunc,
  dateValue,
  handleDateChange,
  votesFilterArray,
  handleUpvoteFilter,
  displayDropdown,
  toggleDropdown,
  resetPosts,
}) => {
  return (
    <>
      <nav className="navbar topnav" id="myTopnav">
        <Link className="navbar-brand" to="/">
          Reddit
        </Link>

        <div className="dropdown">
          <Button
            basic
            className="dropdown-btns"
            onClick={() => toggleDropdown()}
            inverted
          >
            Filter By:
            <Icon name="filter" style={{ marginLeft: '5px' }} />
          </Button>

          <Button
            basic
            className="dropdown-btns"
            onClick={() => resetPosts()}
            inverted
          >
            Reset All
            <Icon name="undo" style={{ marginLeft: '5px' }} />
          </Button>
          {displayDropdown && (
            <div id="myDropdown" className="dropdown-content">
              <div className="dropdown-list-item">
                <p className="title">Date</p>
                <input
                  type="date"
                  name="date"
                  id=""
                  value={dateValue}
                  onChange={e => handleDateChange(e)}
                />
              </div>

              <div className="dropdown-list-item">
                <label className="title" htmlFor="upvote-count-range">
                  Upvote count range
                </label>
                <select
                  name="cars"
                  id="upvote-count-range"
                  className="upvote-count-range"
                  onChange={e => handleUpvoteFilter(e)}
                >
                  {votesFilterArray.map(item => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

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
        <div className="dropdown resp">
          <Button
            basic
            className="dropdown-btns"
            onClick={() => toggleDropdown()}
            inverted
          >
            Filter By:
            <Icon name="filter" style={{ marginLeft: '5px' }} />
          </Button>

          <Button
            basic
            className="dropdown-btns"
            onClick={() => resetPosts()}
            inverted
          >
            Reset All
            <Icon name="undo" style={{ marginLeft: '5px' }} />
          </Button>
          {displayDropdown && (
            <div id="myDropdown" className="dropdown-content">
              <div className="dropdown-list-item">
                <p className="title">Date</p>
                <input
                  type="date"
                  name="date"
                  id=""
                  value={dateValue}
                  onChange={e => handleDateChange(e)}
                />
              </div>

              <div className="dropdown-list-item">
                <label className="title" htmlFor="upvote-count-range">
                  Upvote count range
                </label>
                <select
                  name="cars"
                  id="upvote-count-range"
                  className="upvote-count-range"
                  onChange={e => handleUpvoteFilter(e)}
                >
                  {votesFilterArray.map(item => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

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
