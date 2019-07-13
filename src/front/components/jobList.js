import React from 'react';
import axios from 'axios';
import {filter, orderBy} from 'lodash';
import queryString from 'query-string';
import Fuse from 'fuse.js';
import {withStore} from '../store'

class JobList extends React.Component {

  constructor(props) {
    super(props);
    this.props.store.set('jobListings', []);
    this.props.store.set('jobPages', 0);
  }

  componentDidMount(){
    axios.get('https://careers.chugach.com/jobs')
      .then(res => {
        let allJobListings = res.data;
        let {company, keyword, sortBy, order, pageNumber} = queryString.parse(location.search);

        // Filter res by company
        if(company) {
          allJobListings = filter(allJobListings, {companyFilter: company});
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
          let fuse = new Fuse(allJobListings, options);
          allJobListings = fuse.search(keyword);
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
        allJobListings = orderBy(allJobListings, sortBy, order)

        let jobListingsPaged = [];

        while (allJobListings.length) {
          jobListingsPaged.push(allJobListings.splice(0, 16))
        }

        this.props.store.set('jobListings', jobListingsPaged);
        this.props.store.set('jobPages', jobListingsPaged.length);
      });
  }

  render() {
    if(this.props.store.jobListings[0]) {
      return(
        <ul>
          {this.props.store.jobListings[this.props.store.currentPage].map(
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
    } else {
      return(
        <div>
          LOADING
        </div>
      )
    }
  }
}

export default withStore(JobList)
