/**
 * Frontend entry point.
 *
 * src/front/front-index.js
 */
import React from 'react';
import { render } from 'react-dom';
import Careers from './components/careers';

render(
  <Careers />,
  document.getElementById('careers-root')
);
