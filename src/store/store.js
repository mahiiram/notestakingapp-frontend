import {legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// Initial State
const initialState = {
  username: ''
};

// Reducer
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USERNAME':
      return {
        ...state,
        username: action.payload
      };
    default:
      return state;
  }
};

// Create Store
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
