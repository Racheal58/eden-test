import React from 'react';
import { connect } from 'react-redux';

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

  toggleDropdown = () => {
    const { displayDropdown } = this.state;
    this.setState(previousState => ({
      ...previousState,
      displayDropdown: !displayDropdown,
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
      displayDropdown,
    } = this.state;

    return (
      <div>
        <Nav
          toggleValue={toggleValue}
          handleToggle={this.handleToggle}
          searchValue={searchValue}
          handleSearch={this.handleSearch}
          respFunc={this.respFunc}
          handleDateChange={this.handleDateChange}
          dateValue={dateValue}
          votesFilterArray={this.votesFilterArray}
          handleUpvoteFilter={this.handleUpvoteFilter}
          displayDropdown={displayDropdown}
          toggleDropdown={this.toggleDropdown}
          resetPosts={this.resetPosts}
        />
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
