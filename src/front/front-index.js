/**
 * Frontend entry point.
 *
 * src/front/front-index.js
 */
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import { render } from 'react-dom';
import App from './App';
if(document.getElementById('careers-root')){
  render(
    <App />,
    document.getElementById('careers-root')
  );
}
