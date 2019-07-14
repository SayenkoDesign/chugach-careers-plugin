import React from 'react'
import queryString from 'query-string'
import {withStore} from '../store'

// Get query params from url as object
let parsed = queryString.parse(location.search);

export default class FilterBar extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      keyword: parsed.keyword,
      company: parsed.company,
      sortBy: parsed.sortBy,
      order: parsed.order
    }
    this.inputChange = this.inputChange.bind(this)
    this.companyChange = this.companyChange.bind(this)
    this.sortByChange = this.sortByChange.bind(this)
    this.orderChange = this.orderChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.resetForm = this.resetForm.bind(this)
  }

  inputChange(event) {
    this.setState({keyword: event.target.value})
  }

  companyChange(event) {
    this.setState({company: event.target.value})
  }

  sortByChange(event) {
    this.setState({sortBy: event.target.value})
  }

  orderChange(event) {
    this.setState({order: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault();
    // Update query object with form entries
    parsed = {
      search: true,
      keyword: this.state.keyword,
      company: this.state.company,
      order: this.state.order,
      sortBy: this.state.sortBy
    }
    console.log(this.state);
    console.log('parsed', parsed)
    // Stringify stored query params
    let searchString = queryString.stringify(parsed)
    location.search = searchString;
    document.getElementById('careers-root').scrollIntoView();
  }

  resetForm(){
    location.href = location.origin + location.pathname
  }

  render() {
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            <input id="searchInput" type="text" placeholder="Keyword search" defaultValue={this.state.keyword} onChange={this.inputChange} />
          </label>
          <label>
            <select id="company" defaultValue={this.state.company} onChange={this.companyChange}>
              <option value="">All</option>
              <option value="chugach_alaska_corporation">Chugach Alaska Corporation</option>
              <option value="government_division">Government Division</option>
              <option value="chugach_commercial_holdings">Chugach Commercial Holdings</option>
              <option value="chugach_alaska_services">Chugach Alaska Services</option>
              <option value="tcc">TCC</option>
              <option value="rex_electric">Rex Electric</option>
            </select>
          </label>
          <label>
            <select id="sortBy" defaultValue={this.state.sortBy} onChange={this.sortByChange}>
              <option value="nativeDate">Date Posted</option>
              <option value="title">Title</option>
              <option value="location">Location</option>
            </select>
          </label>
          <label>
            <select id="order" defaultValue={this.state.order} onChange={this.orderChange}>
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
