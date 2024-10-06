import * as React from 'react';
import {loadRemoteModule} from "../utils/remote-module-manager";

const RemoteApp = React.lazy(() => loadRemoteModule('remote-app', './Module'));

export function App() {


  return (
    <React.Suspense fallback={null}>
      <h5>This is Host App</h5>

      <div>
        <h6>This is Remote Wrapper</h6>
        <RemoteApp/>
      </div>

    </React.Suspense>
  );
}

export default App;
