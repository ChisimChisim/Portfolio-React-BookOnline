import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { ConnectedRouter }  from 'react-router-redux';
import createBrowserHistory  from 'history/createBrowserHistory';
import createStore from './store/index';
import { CookiesProvider } from 'react-cookie';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import './index.css';



//Create history
const history = createBrowserHistory();

//Create Store
const store = createStore(history);
const persistor = persistStore(store)


ReactDOM.render(
<Provider store={store}>
<PersistGate loading={null} persistor={persistor}>
<CookiesProvider>
  <ConnectedRouter history={history}>
    <App />
  </ConnectedRouter>  
</CookiesProvider>
</PersistGate>
</Provider>,
document.getElementById('root')
);