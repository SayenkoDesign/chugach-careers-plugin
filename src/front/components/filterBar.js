import React from 'react'
import queryString from 'query-string'
import {withStore} from '../store'
import axios from 'axios'

// Get query params from url as object
let parsed = queryString.parse(location.search);

class FilterBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      keyword: parsed.keyword,
      company: parsed.company,
      sortBy: parsed.sortBy,
      order: parsed.order,
      isLocation: parsed.isLocation,
      jobLocation: parsed.jobLocation
    }
    this.inputChange = this.inputChange.bind(this)
    this.companyChange = this.companyChange.bind(this)
    this.sortByChange = this.sortByChange.bind(this)
    this.orderChange = this.orderChange.bind(this)
    this.locationChange = this.locationChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.resetForm = this.resetForm.bind(this)
    this.props.store.set('locations', [])
  }

  inputChange(event) {
    this.setState({keyword: event.target.value})
  }

  companyChange(event) {
    this.setState({company: event.target.value})
  }

  sortByChange(event) {
    if(event.target.value === 'location') {
      this.setState({isLocation: 'true'})
      this.setState({sortBy: 'nativeDate'})
    } else {
      this.setState({isLocation: 'false'})
      this.setState({sortBy: event.target.value})
      this.setState({jobLocation: ''})
    }
  }

  orderChange(event) {
    this.setState({order: event.target.value})
  }

  locationChange(event) {
    this.setState({jobLocation: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault();
    // Update query object with form entries
    parsed = {
      search: true,
      keyword: this.state.keyword,
      company: this.state.company,
      order: this.state.order,
      sortBy: this.state.sortBy,
      isLocation: this.state.isLocation,
      jobLocation: this.state.jobLocation
    }
    console.log(this.state);
    console.log('parsed', parsed)
    // Stringify stored query params
    let searchString = queryString.stringify(parsed)
    location.search = searchString;
  }

  resetForm(){
    location.href = location.origin + location.pathname
  }

  componentDidMount(){
    axios.get('https://careers.chugach.com/locations')
    .then(res => {
      this.props.store.set('locations', res.data.locations)
    })
  }

  render() {
    if(this.state.isLocation === 'true') {
      return(
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              <input id="searchInput" type="text" placeholder="Keyword search" value={this.state.keyword} onChange={this.inputChange} />
            </label>
            <label>
              <select id="company" value={this.state.company} onChange={this.companyChange}>
                <option value="">All Chugach Companies</option>
                <option value="chugach_alaska_corporation">Chugach Alaska Corporation</option>
                <option value="government_division">Chugach Government Solutions</option>
                <option value="chugach_commercial_holdings">Chugach Commercial Holdings</option>
                <option value="chugach_alaska_services">Chugach Alaska Services</option>
                <option value="tcc">TCC</option>
                <option value="rex_electric">Rex Electric</option>
              </select>
            </label>
            <label>
              <select id="sortBy" value="location" onChange={this.sortByChange}>
                <option value="nativeDate">Date Posted</option>
                <option value="title">Title</option>
                <option value="location">Location</option>
              </select>
            </label>
            <label>
              <select id="order" value={this.state.jobLocation} onChange={this.locationChange}>
                <option>All</option>
                {this.props.store.locations.map(
                  jobLocation => (
                    <option key={this.props.store.locations.indexOf(jobLocation)} value={jobLocation}>{jobLocation}</option>
                  )
                )}
              </select>
            </label>
            <input type="submit" value="Search" />
            <input type="button" onClick={this.resetForm} value="Reset" />
          </form>
        </div>
      )
    } else {
      return(
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              <input id="searchInput" type="text" placeholder="Keyword search" value={this.state.keyword} onChange={this.inputChange} />
            </label>
            <label>
              <select id="company" value={this.state.company} onChange={this.companyChange}>
                <option value="">All Chugach Companies</option>
                <option value="chugach_alaska_corporation">Chugach Alaska Corporation</option>
                <option value="government_division">Chugach Government Solutions</option>
                <option value="chugach_commercial_holdings">Chugach Commercial Holdings</option>
                <option value="chugach_alaska_services">Chugach Alaska Services</option>
                <option value="tcc">TCC</option>
                <option value="rex_electric">Rex Electric</option>
              </select>
            </label>
            <label>
              <select id="sortBy" value={this.state.sortBy} onChange={this.sortByChange}>
                <option value="nativeDate">Date Posted</option>
                <option value="title">Title</option>
                <option value="location">Location</option>
              </select>
            </label>
            <label>
              <select id="order" value={this.state.order} onChange={this.orderChange}>
                <option value="asc">A-Z or Newest to Oldest</option>
                <option value="desc">Z-A or Oldest to Newest</option>
              </select>
            </label>
            <input type="submit" value="Search" />
            <input type="button" onClick={this.resetForm} value="Reset" />
          </form>
        </div>
      )
    }
  }
}

export default withStore(FilterBar)
