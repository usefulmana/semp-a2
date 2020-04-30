import React, {Component} from 'react';
import store from './components/common/store';
import { loadUser } from './components/actions/authActions';
import { Provider } from 'react-redux';
import Routes from './Routes';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <Routes/>
      </Provider>
    );
  }
}

export default App;
