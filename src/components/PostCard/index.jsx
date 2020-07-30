import React from 'react';
import moment from 'moment';

import './index.scss';

const PostCard = ({ post: { data } }) => {
  return (
    <a
      href={`https://www.reddit.com${data.permalink}`}
      target="_blank"
      rel="noopener noreferrer"
      className="card_post_link"
    >
      <section className="card_post">
        <div className="sidebar">
          <i className="fas fa-arrow-up" />
          <p className="vote-count">{data.score}</p>
          <i className="fas fa-arrow-down" />
        </div>

        <div className="main">
          <div className="meta_data_bar">
            <p className="subreddit_name">{data.subreddit_name_prefixed}</p>
            <p className="author">
              {!data.is_crosspostable
                ? `Posted by ${data.author}`
                : `Crossposted by ${data.author}`}
            </p>
            <p className="time">
              {moment.utc().from(data.created, 'YYYYMMDD')} ago
            </p>
          </div>
          <div className="body">
            <div>
              <p className="post-title">{data.title}</p>
            </div>
            {data.thumbnail !== '' && (
              <div className="thumbnail">
                <img src={data.thumbnail} alt="" />
              </div>
            )}
          </div>
        </div>
      </section>
    </a>
  );
};

export default PostCard;
