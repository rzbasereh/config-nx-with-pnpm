import * as React from 'react';
import {loadRemoteModule, setRemoteDefinitions} from "../utils/remote-module-manager";

setRemoteDefinitions({"remote": ['http://localhost:4201']});

const RemoteApp = React.lazy(() => loadRemoteModule('remote'));

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
