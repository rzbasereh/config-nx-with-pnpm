import * as React from 'react';

import NxWelcome from './nx-welcome';

import { Link, Route, Routes } from 'react-router-dom';

const RemoteApp = React.lazy(() => import('remote-app/Module'));

export function App() {
  return (
    <React.Suspense fallback={null}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/remote-app">RemoteApp</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<NxWelcome title="host-app" />} />

        <Route path="/remote-app" element={<RemoteApp />} />
      </Routes>
    </React.Suspense>
  );
}

export default App;
