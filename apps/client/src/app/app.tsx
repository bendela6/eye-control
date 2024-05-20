import { Notifications } from './components';
import { Provider as ReduxProvider } from 'react-redux';
import React from 'react';
import { store } from './store';

export function App() {
  return (
    <ReduxProvider store={store}>
      <div className="container mt-4">
        <div className="row">
          <div className="col-10 offset-1">
            <Notifications />
          </div>
        </div>
      </div>
    </ReduxProvider>
  );
}

export default App;
