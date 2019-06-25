import React from 'react';
import axios from 'axios';
import {filter, orderBy} from 'lodash';
import queryString from 'query-string';
import Fuse from 'fuse.js';

export default class JobList extends React.Component {
  state = {
    jobListings: []
  };

  componentDidMount(){
    axios.get('https://careers.chugach.com/jobs')
      .then(res => {
        let jobListings = res.data;
        let {company, keyword, sortBy, order}  = queryString.parse(location.search);

        // Filter res by company
        if(company) {
          jobListings = filter(jobListings, {companyFilter: company});
        }

        // Filter res by search term
        if(keyword) {
          //Fuse search options
          var options = {
            shouldSort: true,
            threshold: 0.5,
            location: 0,
            distance: 50,
            maxPatternLength: 32,
            minMatchCharLength: 3,
            keys: [
              'title',
              'searchTerms',
              'location'
            ]
          };
          // Fuse results
          let fuse = new Fuse(jobListings, options);
          jobListings = fuse.search(keyword);
        }

        //Order results
        if(!sortBy) {
          sortBy = 'nativeDate';
        }

        if (!order && sortBy === 'nativeDate') {
          order = 'desc';
        } else if (sortBy === 'nativeDate' && order === 'desc') {
          order = 'asc';
        } else if (sortBy === 'nativeDate' && order === 'asc') {
          order = 'desc'
        }
        jobListings = orderBy(jobListings, sortBy, order)
        console.log(jobListings[0]);
        this.setState({jobListings: jobListings})
      });
  }

  render() {
    // TODO: Check job sources for UID to scrape. If none can be found or can't be reasonably certain that there won't be duplicates use UUID generator in scrape tool
    return(
      <ul>
        {this.state.jobListings.map(
          job => (
            <li key={job.uuid}>
              <a href={job.url} target="_blank">
                <h3>{job.title}</h3>
                <span className="company">{job.company}</span>
                <span className="location">{job.location}</span>
                <span className="date">{job.date}</span>
                <span className="closingDate">{job.closingDate}</span>
              </a>
            </li>
          )
        )}
      </ul>
    )
  }
}
