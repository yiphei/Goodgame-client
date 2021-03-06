import axios from 'axios';

const ROOT_URL = 'https://good-game.herokuapp.com/api';
// const ROOT_URL = 'http://localhost:9090/api'; // local testing

export const ActionTypes = {
  FETCH_COURTS: 'FETCH_COURTS',
  CREATE_COURT: 'CREATE_COURT',
  UPDATE_COURT: 'UPDATE_COURT',
  FETCH_BY_ID: 'FETCH_BY_ID',
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
  UPDATE_POST: 'UPDATE_POST',
  CREATE_POST: 'CREATE_POST',
  DELETE_POST: 'DELETE_POST',
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
  JOIN_GAME: 'JOIN_GAME',
  FETCH_USER: 'FETCH_USER',
  FETCH_USERS: 'FETCH_USERS',
  UPDATE_POSTGAMEVALUTAION: 'UPDATE_POSTGAMEVALUTAION',
  ADD_PLAYER: 'ADD_PLAYER',
};

export function createCourt(court) {
  return (dispatch) => {
    const fields = {
      title: court.date,
      lat: court.lat,
      long: court.long,
      game_list: [],
    };
    // axios.post(`${ROOT_URL}/posts${API_KEY}`, fields).then((response) => {
    axios.post(`${ROOT_URL}/courts`, fields, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      console.log('in createCourt');
      dispatch({ type: 'CREATE_COURT', payload: null });
      console.log(response.data);
      // dispatch({ type: 'CREATE_POST', payload: response.data });
    }).catch((error) => {
      console.log(error.response);
    });
  };
}

export function fetchCourts() {
  // Action Creator returns a function
  // that gets called b the middleware passing in dispatch to it as an arg
  return (dispatch) => {
    // axios.get(`${ROOT_URL}/posts${API_KEY}`).then((response) => {
    axios.get(`${ROOT_URL}/courts`).then((response) => {
      // response.data is a json file
      console.log('in fetchCourts', response.data);
      dispatch({ type: 'FETCH_COURTS', payload: response.data });
    }).catch((error) => {
      console.log('error occured during fetchPosts');
    });
    // on the completion we will dispatch an action
    // can now dispatch stuff
  };
}

export function updateCourt(court) {
  return (dispatch) => {
    const id = court._id;
    const fields = {
      id: court._id, title: court.title, coordinate: court.coordinate, game_list: court.game_list,
    };
    console.log(court);
    // axios.put(`${ROOT_URL}/posts/${id}${API_KEY}`, fields).then((response) => {
    axios.put(`${ROOT_URL}/posts/${id}`, fields, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      // console.log('in updatePost', response.data);
      console.log('in updateCourt');
      dispatch({ type: 'UPDATE_COURT', payload: court });
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function fetchCourt(id) {
  return (dispatch) => {
    // axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`).then((response) => {
    console.log('fetchcourt ', id);
    axios.get(`${ROOT_URL}/courts/${id}`).then((response) => {
      console.log('fetchCourt response ', response.data);
      dispatch({ type: 'FETCH_COURT', payload: response.data });
    }).catch((error) => {
      console.log('error occured during fetchCourt');
    });
  };
}

export function addGameToCourt(id, game) {
  return (dispatch) => {
    const fields = {
      game_list: game,
    };
    axios.put(`${ROOT_URL}/courts/${id}`, fields).then((response) => {
      // console.log('in updatePost', response.data);
      console.log('in updateCourt');
      dispatch({ type: 'UPDATE_COURT', payload: null });
    }).catch((error) => {
      console.log(error.response);
    });
  };
}

export function findGames(idArray) {
  return (dispatch) => {
    // axios.get(`${ROOT_URL}/posts${API_KEY}`).then((response) => {
    axios.find(`${ROOT_URL}/posts`, '_id': { $in: idArray }).then((response) => {
      // response.data is a json file
      dispatch({ type: 'FETCH_BY_ID', payload: response.data });
    }).catch((error) => {
      console.log('error occured during fetchPosts');
    });
    // on the completion we will dispatch an action
    // can now dispatch stuff
  };
}

export function fetchGames() {
  // Action Creator returns a function
  // that gets called b the middleware passing in dispatch to it as an arg
  return (dispatch) => {
    // axios.get(`${ROOT_URL}/posts${API_KEY}`).then((response) => {
    axios.get(`${ROOT_URL}/posts`).then((response) => {
      // response.data is a json file
      dispatch({ type: 'FETCH_POSTS', payload: response.data });
    }).catch((error) => {
      console.log('error occured during fetchPosts');
    });
    // on the completion we will dispatch an action
    // can now dispatch stuff
  };
}

// axios PUT
export function updateGame(id, game) {
  console.log('IN UPDATEGAME');
  return (dispatch) => {
    axios.put(`${ROOT_URL}/postssss/${id}`, game, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      // console.log('in updatePost', response.data);
      console.log('UPDATEGAME SUCCESS');
      dispatch({ type: 'UPDATE_POST', payload: game });
    }).catch((error) => {
      console.log('error occured during updateGame');
    });
  };
}

// Update postGameEvaluation - Ally
export function updatePostGameEvaluation(game, postGameEval) {
  return (dispatch) => {
    const id = game._id;
    const fields = {
      postGameEvaluation: postGameEval,
    };
    console.log('post game eval in actions/index.js', fields);
    console.log(game);
    // axios.put(`${ROOT_URL}/posts/${id}${API_KEY}`, fields).then((response) => {
    axios.put(`${ROOT_URL}/postss/${id}`, fields, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      console.log('in updatePost', response.data);
      fetchGames();
      dispatch({ type: 'UPDATE_POSTGAMEVALUATION', payload: game });
    }).catch((error) => {
      console.log('error occured during updatePostGameEvaluation');
    });
  };
}


export function joinGame(id, game) {
  console.log('Inside JOINGAME');
  return (dispatch) => {
    axios.put(`${ROOT_URL}/posts/${id}`, game, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      console.log('BEFORE TRYING TO ADD GAME TO USER');
      console.log(response.data);
      axios.put(`${ROOT_URL}/user/addgame`, response.data, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
        console.log('AFTER TRYING TO ADD GAME TO USER');

        axios.get(`${ROOT_URL}/posts/${id}`).then((response) => {
          console.log('AFTER JOINGAME FETCHGAME');
          const game2 = response.data;

          axios.get(`${ROOT_URL}/user`, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
            console.log('AFTER JOINGAME FETCHUSER');
            console.log(response.data);
            console.log('BUILDING THE PACKET');
            const packet = { game: game2, user: response.data };
            console.log(packet);
            dispatch({
              type: ActionTypes.ADD_PLAYER,
              payload: packet, // i put fields here instead of const updated because the backend does not return the updated post
            });
          }).catch((error) => {
            console.log('error occured during fetchUser');
          });
        }).catch((error) => {
          console.log('error occured during fetchPosts');
        });
      }).catch((error) => {
        // hit an error do something else!
        console.log('error');
      });
    }).catch((error) => {
    // hit an error do something else!
      console.log('error');
    });
  };
}


export function leaveGame(id, game) {
  console.log('Inside LeaveGame');
  return (dispatch) => {
    axios.put(`${ROOT_URL}/posts/${id}`, game, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      console.log('BEFORE TRYING TO DELETE GAME TO USER');
      console.log(response.data);
      axios.put(`${ROOT_URL}/user/delgame`, response.data, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
        console.log('AFTER TRYING TO DELETE GAME TO USER');

        axios.get(`${ROOT_URL}/posts/${id}`).then((response) => {
          console.log('AFTER LeaveGame FETCHGAME');
          const game2 = response.data;

          axios.get(`${ROOT_URL}/user`, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
            console.log('AFTER LeaveGame FETCHUSER');
            console.log(response.data);
            console.log('BUILDING THE PACKET');
            const packet = { game: game2, user: response.data };
            console.log(packet);
            dispatch({
              type: ActionTypes.ADD_PLAYER,
              payload: packet, // i put fields here instead of const updated because the backend does not return the updated post
            });
          }).catch((error) => {
            console.log('error occured during fetchUser');
          });
        }).catch((error) => {
          console.log('error occured during fetchPosts');
        });
      }).catch((error) => {
        // hit an error do something else!
        console.log('error');
      });
    }).catch((error) => {
    // hit an error do something else!
      console.log('error');
    });
  };
}


// axios GET
export function fetchGame(id) {
  return (dispatch) => {
    // axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`).then((response) => {
    axios.get(`${ROOT_URL}/posts/${id}`).then((response) => {
      dispatch({ type: 'FETCH_POST', payload: response.data });
    }).catch((error) => {
      console.log('error occured during fetchPosts');
    });
  };
}

export function createGame(post) {
  return (dispatch) => {
    const fields = {
      date: post.date,
      time: post.time,
      duration: post.duration,
      players_needed: post.players_needed,
      max_players: post.max_players,
      level: post.level,
    };
    // axios.post(`${ROOT_URL}/posts${API_KEY}`, fields).then((response) => {
    axios.post(`${ROOT_URL}/posts`, fields, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      // dispatch({ type: 'CREATE_POST', payload: response.data });
      console.log(response.data);
      axios.put(`${ROOT_URL}/user`, response.data, { headers: { authorization: localStorage.getItem('token') } }).then((resp) => {
      // do something with response.data  (some json)
        console.log('IN CREATEGAME: ADDED SUCCESS');
        dispatch({ type: 'CREATE_POST', payload: response.data });
      }).catch((error) => {
      // hit an error do something else!
        console.log('IN CREATEGAME: ADDED FAILURE');
      });
    }).catch((error) => {
      console.log(error);
    });
  };
}

// axios DELETE
export function deleteGame(id, history) {
  return (dispatch) => {
    // axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`).then((response) => {
    axios.delete(`${ROOT_URL}/posts/${id}`, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      console.log('in deletePost');
      // fetchGames();
      dispatch({ type: 'DELETE_POST', payload: null });
    }).catch((error) => {
      console.log('error occured during fetchPosts');
    });
  };
}


export function authError(error) {
  return {
    type: ActionTypes.AUTH_ERROR,
    message: error,
  };
}

export function signinUser({ email, password }) {
  // takes in an object with email and password (minimal user object)
  // returns a thunk method that takes dispatch as an argument (just like our create post method really)
  return (dispatch) => {
    const fields = {
      email, password,
    };
    // does an axios.post on the /signin endpoint
    axios.post(`${ROOT_URL}/signin`, fields).then((response) => {
      console.log('in signinUser');
      dispatch({ type: ActionTypes.AUTH_USER });
      localStorage.setItem('token', response.data.token);
    }).catch((error) => {
      console.log(error.response);
      // dispatch(authError(`Sign In Failed: ${error.response.data}`));
    });
  };
}

// export function signupUser({ email, password, handle }, history) {
export function signupUser(user) {
  console.log('user in sign up user', user);
  // takes in an object with email and password (minimal user object)
  // returns a thunk method that takes dispatch as an argument (just like our create post method really)
  return (dispatch) => {
    const fields = {
      email: user.email, password: user.password, handle: user.handle,
    };
    // does an axios.post on the /signup endpoint
    console.log('start signupUser');
    axios.post(`${ROOT_URL}/signup`, fields).then((response) => {
      console.log('in signupUser');
      dispatch({ type: ActionTypes.AUTH_USER });
      localStorage.setItem('token', response.data.token);
    }).catch((error) => {
      console.log(error.response);
      dispatch(authError(`Sign Up Failed: ${error.response.data}`));
    });
  };
}

// deletes token from localstorage
// and deauths
export function signoutUser(history) {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: ActionTypes.DEAUTH_USER });
    history.push('/');
  };
}


export function fetchUser() {
  return (dispatch) => {
    // axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`).then((response) => {
    // console.log('in REACT fetchuser ');
    axios.get(`${ROOT_URL}/user`, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      // console.log('in fetchuser SUCCESS', response.data);
      dispatch({ type: 'FETCH_USER', payload: response.data });
    }).catch((error) => {
      console.log(error);
    });
  };
}


// export function fetchUsers() {
//   // Action Creator returns a function
//   // that gets called b the middleware passing in dispatch to it as an arg
//   return (dispatch) => {
//     // axios.get(`${ROOT_URL}/posts${API_KEY}`).then((response) => {
//     axios.get(`${ROOT_URL}/users`).then((response) => {
//       // response.data is a json file
//       console.log('in fetchUsers', response.data);
//       dispatch({ type: 'FETCH_USERS', payload: response.data });
//     }).catch((error) => {
//       console.log('error occured during fechUsers');
//     });
//     // on the completion we will dispatch an action
//     // can now dispatch stuff
//   };
// }
