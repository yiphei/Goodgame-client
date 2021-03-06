import { ActionTypes } from '../actions';

const initialState = {
  all: [], // array of all users
  user: {},
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_USER: {
      console.log(action.payload);
      return { ...state, user: action.payload }; // return state w/ all property set to new posts
    }
    case ActionTypes.FETCH_USERS: {
      return { ...state, all: action.payload }; // return state w/ all property set to new posts
    }
    case ActionTypes.ADD_PLAYER: {
      return { ...state, user: action.payload.user }; // return state w/ all property set to new posts
    }
    default:
      return state;
  }
};

export default UserReducer;
