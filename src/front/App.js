import React, { Component } from 'react'
import { createStore} from './store'
import FilterBar from './components/FilterBar'
import JobList from './components/JobList'
import Pagination from './components/Pagination'

const MyApp = props => (
  <div>
    <FilterBar />
    <JobList />
    <Pagination />
  </div>
)
export default createStore(MyApp)
