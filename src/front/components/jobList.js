import React, {useEffect} from 'react';
import axios from 'axios';
import {filter, orderBy} from 'lodash';
import queryString from 'query-string';
import Fuse from 'fuse.js';
import {upperCase} from 'lodash';
import {withStore} from '../store';

class JobList extends React.Component {

  constructor(props) {
    super(props);
    this.props.store.set('jobListings', [])
    this.props.store.set('totalJobs', 0)
    this.props.store.set('jobPages', 0)
    this.props.store.set('search', false)
  }

  componentDidMount(){
    axios.get('https://careers.chugach.com/jobs')
      .then(res => {
        let allJobListings = res.data;
        let friednlyName = '';
        let {search, company, keyword, sortBy, order, pageNumber} = queryString.parse(location.search);

        // Filter res by company
        if(company) {
          allJobListings = filter(allJobListings, {companyFilter: company});
          friednlyName = allJobListings[0].company;
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

        this.props.store.set('totalJobs', allJobListings.length);

        let jobListingsPaged = [];

        while (allJobListings.length) {
          jobListingsPaged.push(allJobListings.splice(0, 16))
        }

        if(search) {
          this.props.store.set('search', true)
        }

        this.props.store.set('jobListings', jobListingsPaged);
        this.props.store.set('jobPages', jobListingsPaged.length);

        let resultType = keyword ? `Results Found for: ${keyword}`
                       : company ? `Results Found for: ${friednlyName}`
                       : `Results Found`;

        this.props.store.set('resultType', resultType)
        console.log(resultType);
      });
  }

  render() {
    if(this.props.store.jobListings[this.props.store.currentPage] && this.props.store.search) {
      return(
        <div className="results-wrapper">
          <span className="results-count">{this.props.store.totalJobs} {this.props.store.resultType}</span>
          <div className='row small-up-1 medium-up-2 large-up-4 align-center grid'>
            {this.props.store.jobListings[this.props.store.currentPage].map(
              job => (
                <div key={job.uuid} className='column'>
                  <a href={job.url} target="_blank">
                    <h3>{job.title}</h3>
                    <span className="company">{job.company}</span>
                    <span className="location">{job.location}</span>
                    <span className="date">{job.date}</span>
                    <span className="closingDate">{job.closingDate}</span>
                  </a>
                </div>
              )
            )}
          </div>
        </div>
      )
    } else {
      return(
        <div>
        </div>
      )
    }
  }
}

export default withStore(JobList)
