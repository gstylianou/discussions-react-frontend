/* eslint-disable indent */

import * as React from 'react';
import App, {
  loader as paramsLoader,
} from './App';
import * as ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import './index.css';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    loader: paramsLoader,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
