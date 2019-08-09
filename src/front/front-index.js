/**
 * Frontend entry point.
 *
 * src/front/front-index.js
 */
import React from 'react';
import { render } from 'react-dom';
import App from './App';
if(document.getElementById('careers-root')){
  render(
    <App />,
    document.getElementById('careers-root')
  );
}
