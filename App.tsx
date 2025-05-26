import React from 'react';
import RootNavigation from './src/navigation/RootNavigation';
import { Provider } from 'react-redux';
import store from './src/store';
import { PersistGate } from 'redux-persist/integration/react';

function App(): React.JSX.Element {
  return (
    <Provider store={store.store}>
      <PersistGate persistor={store.persistor}>
        <RootNavigation />
      </PersistGate>
    </Provider>
  );
}

export default App;
