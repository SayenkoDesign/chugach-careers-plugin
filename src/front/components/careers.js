import React from 'react';
import FilterBar from './filterBar';
import JobList from './jobList';

function Careers(props) {

  console.log('From careers.js ', JobList.state);
  return (
    <div>
      <FilterBar />
      <JobList />
    </div>
  )
}

export default Careers;
