import { toast } from 'react-toastify';
import moment from 'moment';

import { http } from '../../api/client';

const GET_DATA_SUCCESS = 'GET_DATA_SUCCESS';
const GET_DATA_ERROR = 'GET_DATA_ERROR';

const FILTER_POSTS_SUCCESS = 'FILTER_POSTS_SUCCESS';
const FILTER_POSTS_ERROR = 'FILTER_POSTS_ERROR';

const RESET_POSTS_SUCCESS = 'RESET_POSTS_SUCCESS';
const RESET_POSTS_ERROR = 'RESET_POSTS_ERROR';

function sortDescending(a, b) {
  if (a.data.score > b.data.score) return -1;
  if (b.data.score > a.data.score) return 1;

  return 0;
}

function sortAscending(a, b) {
  if (a.data.score > b.data.score) return 1;
  if (b.data.score > a.data.score) return -1;

  return 0;
}

export const sortInAscendingOrder = posts => async dispatch => {
  try {
    const sortedArray = posts.sort(sortAscending);
    dispatch({ type: FILTER_POSTS_SUCCESS, payload: sortedArray });
  } catch (error) {
    toast.error(`${error.response.data.message}`);
    dispatch({ type: FILTER_POSTS_ERROR, payload: error.response.data });
  }
};

export const sortInDescendingOrder = posts => async dispatch => {
  try {
    const sortedArray = posts.sort(sortDescending);
    dispatch({ type: FILTER_POSTS_SUCCESS, payload: sortedArray });
  } catch (error) {
    toast.error(`${error.response.data.message}`);
    dispatch({ type: FILTER_POSTS_ERROR, payload: error.response.data });
  }
};

export const getData = () => async dispatch => {
  try {
    const {
      data: { data },
    } = await http.get('');

    const sortedArray = data.children.sort(sortDescending);
    dispatch({
      type: GET_DATA_SUCCESS,
      payload: {
        posts: sortedArray,
        subreddits: [
          ...new Set(
            data.children.map(item => item.data.subreddit_name_prefixed),
          ),
        ],
      },
    });
  } catch (error) {
    toast.error(`${error.response.data.message}`);
    dispatch({ type: GET_DATA_ERROR, payload: error.response.data });
  }
};

export const filterPosts = (subreddit, posts) => async dispatch => {
  try {
    const filteredPosts = posts.filter(
      post => post.data.subreddit_name_prefixed === subreddit,
    );
    dispatch({ type: FILTER_POSTS_SUCCESS, payload: filteredPosts });
  } catch (error) {
    toast.error(`${error.response.data.message}`);
    dispatch({ type: FILTER_POSTS_ERROR, payload: error.response.data });
  }
};

export const resetPosts = posts => async dispatch => {
  try {
    dispatch({ type: RESET_POSTS_SUCCESS, payload: posts });
  } catch (error) {
    toast.error(`${error.response.data.message}`);
    dispatch({ type: RESET_POSTS_ERROR, payload: error.response.data });
  }
};

export const search = (searchValue, posts) => async dispatch => {
  try {
    const filteredPosts = posts.filter(post =>
      post.data.title.toLowerCase().includes(searchValue.toLowerCase()),
    );
    dispatch({ type: FILTER_POSTS_SUCCESS, payload: filteredPosts });
  } catch (error) {
    toast.error(`${error.response.data.message}`);
    dispatch({ type: FILTER_POSTS_ERROR, payload: error.response.data });
  }
};

export const filterByUpvoteCount = (value, posts) => async dispatch => {
  try {
    const start = value === '150k+' ? 150000 : Number(value.split('-')[0]);
    const end = value === '150k+' ? null : Number(value.split('-')[1]);

    const filteredPosts = posts.filter(
      post => post.data.score >= start && post.data.score <= end,
    );
    dispatch({ type: FILTER_POSTS_SUCCESS, payload: filteredPosts });
  } catch (error) {
    toast.error(`${error.response.data.message}`);
    dispatch({ type: FILTER_POSTS_ERROR, payload: error.response.data });
  }
};

export const filterByDate = (value, posts) => async dispatch => {
  try {
    const filteredPosts = posts.filter(
      post => moment(post.data.created).format('YYYY-MM-DD') === value,
    );
    dispatch({ type: FILTER_POSTS_SUCCESS, payload: filteredPosts });
  } catch (error) {
    toast.error(`${error.response.data.message}`);
    dispatch({ type: FILTER_POSTS_ERROR, payload: error.response.data });
  }
};

const DEFAULT_STATE = {
  error: {},
  isLoading: false,
  posts: [],
  allPosts: [],
  subreddits: [],
};

export const starterReducer = (state = DEFAULT_STATE, { type, payload }) => {
  switch (type) {
    case GET_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        posts: payload.posts,
        allPosts: payload.posts,
        subreddits: payload.subreddits,
      };
    case FILTER_POSTS_SUCCESS:
    case RESET_POSTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        posts: payload,
      };
    case GET_DATA_ERROR:
    case FILTER_POSTS_ERROR:
    case RESET_POSTS_ERROR:
      return {
        ...state,
        isLoading: false,
        status: 'error',
        error: payload,
      };
    default:
      return state;
  }
};
