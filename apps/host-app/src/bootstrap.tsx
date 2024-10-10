import {StrictMode} from 'react';
import * as ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';

import App from './app/app';
import {setRemoteDefinitions} from "./utils/remote-module-manager";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </StrictMode>
);
