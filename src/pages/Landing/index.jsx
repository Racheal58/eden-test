import React from 'react';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';

// styles
import './index.scss';

// components
import PostCard from '../../components/PostCard/index.jsx';
import Nav from '../../components/Nav/index.jsx';

// actions
import {
  getData,
  filterPosts,
  resetPosts,
  sortInAscendingOrder,
  sortInDescendingOrder,
  search,
  filterByUpvoteCount,
  filterByDate,
} from '../../store/modules/starter';

class Landing extends React.Component {
  state = {
    toggleValue: false,
    searchValue: '',
    showFilter: false,
    dateValue: '',
    respSidebarDisplay: false,
  };

  componentDidMount = () => {
    this.props.getData();
  };

  filterPosts = subreddit => {
    this.props.filterPosts(subreddit, this.props.allPosts);
  };

  resetPosts = () => {
    this.props.resetPosts(this.props.allPosts);
  };

  handleAscendingOrderSort = () => {
    this.props.sortInAscendingOrder(this.props.posts);
  };

  handleDescendingOrderSort = () => {
    this.props.sortInDescendingOrder(this.props.posts);
  };

  handleToggle = ({ target: { checked } }) => {
    this.setState(previousState => ({
      ...previousState,
      toggleValue: checked,
    }));

    if (checked === true) {
      this.handleAscendingOrderSort();
    } else {
      this.handleDescendingOrderSort();
    }
  };

  handleSearch = ({ target: { value } }) => {
    this.setState(previousState => ({
      ...previousState,
      searchValue: value,
    }));

    this.props.search(value, this.props.posts);
  };

  toggleFilter = () => {
    const { showFilter } = this.state;
    this.setState(previousState => ({
      ...previousState,
      showFilter: !showFilter,
    }));
  };

  votesFilterArray = [
    '0-4999',
    '5000-19999',
    '20000-69999',
    '70000-99999',
    '100000-149999',
    '150k+',
  ];

  handleUpvoteFilter = ({ target: { value } }) => {
    this.props.filterByUpvoteCount(value, this.props.allPosts);
  };

  handleDateChange = ({ target: { value } }) => {
    this.setState(previousState => ({
      ...previousState,
      dateValue: value,
    }));
    this.props.filterByDate(value, this.props.allPosts);
  };

  respFunc = () => {
    const { respSidebarDisplay } = this.state;
    this.setState(previousState => ({
      ...previousState,
      respSidebarDisplay: !respSidebarDisplay,
    }));
  };

  render() {
    const { posts, subreddits } = this.props;
    const {
      toggleValue,
      searchValue,
      showFilter,
      dateValue,
      respSidebarDisplay,
    } = this.state;

    return (
      <div>
        <Nav
          toggleValue={toggleValue}
          handleToggle={this.handleToggle}
          searchValue={searchValue}
          handleSearch={this.handleSearch}
          respFunc={this.respFunc}
        />

        <section className="filter-section">
          <div className="cta-section">
            <Button basic onClick={() => this.toggleFilter()} inverted>
              Filter By:
              <Icon name="filter" id="filter-icon" />
            </Button>

            <Button basic onClick={() => this.resetPosts()} inverted>
              Reset All
              <Icon name="undo" id="undo-icon" />
            </Button>
          </div>

          {showFilter && (
            <div className="main">
              <div className="date-section">
                <input
                  type="date"
                  name="date"
                  id=""
                  value={dateValue}
                  onChange={e => this.handleDateChange(e)}
                />
              </div>

              <div className="votes-section">
                <div className="form-group">
                  {this.votesFilterArray.map(item => (
                    <div
                      key={item}
                      className="custom-control custom-radio custom-control-inline"
                    >
                      <input
                        type="radio"
                        id={item}
                        value={item}
                        name="upvote"
                        onChange={e => this.handleUpvoteFilter(e)}
                      />
                      <label className="custom-label d-flex" htmlFor={item}>
                        <p>{item}</p>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>
        <section className="layout">
          <div className="left">
            <div className="postscard_container">
              {posts &&
                posts.map((post, index) => (
                  <PostCard key={index} post={post} />
                ))}
            </div>
          </div>

          <div className="right hide-lg">
            <div className="subreddits-container">
              <div className="title">Top Subreddits</div>
              <div className="lists">
                {subreddits &&
                  subreddits.map((subreddit, index) => (
                    <button
                      key={index}
                      style={{
                        color: 'white',
                      }}
                      type="button"
                      className="subreddit-button"
                      onClick={() => this.filterPosts(subreddit)}
                    >
                      {subreddit}
                    </button>
                  ))}
              </div>
            </div>
          </div>

          {respSidebarDisplay && (
            <div className="right show-sm">
              <div className="subreddits-container">
                <div className="title">Top Subreddits</div>
                <div className="lists">
                  {subreddits &&
                    subreddits.map((subreddit, index) => (
                      <button
                        key={index}
                        style={{
                          color: 'white',
                        }}
                        type="button"
                        className="subreddit-button"
                        onClick={() => this.filterPosts(subreddit)}
                      >
                        {subreddit}
                      </button>
                    ))}
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    );
  }
}

const mapStateToProps = ({ starter }) => ({
  posts: starter.posts,
  allPosts: starter.allPosts,
  subreddits: starter.subreddits,
});

export default connect(mapStateToProps, {
  getData,
  filterPosts,
  resetPosts,
  sortInAscendingOrder,
  sortInDescendingOrder,
  search,
  filterByUpvoteCount,
  filterByDate,
})(Landing);
