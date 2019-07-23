import React from 'react';
import {withStore} from '../store';

class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.props.store.set('currentPage', 0)
    this.nextPage = this.nextPage.bind(this)
    this.prevPage = this.prevPage.bind(this)
    this.jumpPage = this.jumpPage.bind(this)
  }

  nextPage(event) {
    event.preventDefault()
    this.props.store.set('currentPage', ++this.props.store.currentPage)
  }

  prevPage(event) {
    event.preventDefault()
    this.props.store.set('currentPage', --this.props.store.currentPage)
  }

  jumpPage(event) {
    // event.preventDefault()
    this.props.store.set('currentPage', event.target.getAttribute('pagenumber'))
  }

  render() {
    let {jobPages, search, currentPage} = this.props.store
    let pages = [];
    let prevButton, nextButton;

    if(jobPages > 0 && search) {
      for(let i = 1; jobPages >= i; i++){
        pages.push(<li className="pageNumbers" key={i} pagenumber={i - 1} onClick={this.jumpPage}>{i}</li>)
      }

      if(currentPage > 0) {
        prevButton = <a className="prevPage" onClick={this.prevPage}>Prev</a>;
      }

      if(currentPage < jobPages - 1) {
        console.log('job pages = ', jobPages);
        console.log('current page = ', currentPage);
        nextButton = <a className="nextPage" onClick={this.nextPage}>Next</a>;
      }

      return(
        <div className='jobsPagination'>
          {prevButton}
          <ul>
            {pages}
          </ul>
          {nextButton}
        </div>
      )
    } else {
      return(<div></div>)
    }
  }
}

export default withStore(Pagination)
