import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import loggerMiddleware from 'redux-logger';
import AppStack from './src/Navigator/AppStack.js';

const initialState = {
  uid: '',
  fullName: 'Stranger',
  email: 'abc@xyz.com',
  action: "",
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_UID': return { ...state, uid: action.uid };
    case 'UPDATE_NAME': return { ...state, fullName: action.fullName };
    case 'UPDATE_EMAIL': return { ...state, email: action.email };
    case "OPEN_NOTIF": return { ...state, action: "openNotif" };
    case "CLOSE_NOTIF": return { ...state, action: "closeNotif" };
    default: return state;
  }
}
const store = createStore(reducer, applyMiddleware(loggerMiddleware));

const App = props => {
  return (
    <Provider store={store}>
      <AppStack />
    </Provider>
  )
}
export default App;