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
    this.props.store.set('currentPage', ++this.props.store.currentPage);
  }

  prevPage(event) {
    this.props.store.set('currentPage', --this.props.store.currentPage);
  }

  jumpPage(event) {
    console.log('Last Page: ', this.props.store.currentPage);
    this.props.store.set('currentPage', event.target.getAttribute('pageindex'));
    console.log('Last Page: ', this.props.store.currentPage);
  }

  render() {
    let {jobPages, search, currentPage} = this.props.store;
    let pages = [];
    let prevButton, nextButton;

    if(jobPages > 0 && search) {
      for(let i = 1; jobPages >= i; i++){
        let currentPageIndex = i - 1;
        let pageClass = 'pageNumbers';
        if(parseInt(currentPage) === parseInt(currentPageIndex)){
          pageClass = 'pageNumbers active';
        }
        pages.push(<li className={pageClass} key={i} pageindex={currentPageIndex} onClick={this.jumpPage}><span pageindex={currentPageIndex}>{i}</span></li>)
      }

      if(currentPage > 0) {
        prevButton = <li className="prevPage" onClick={this.prevPage}><span>Prev</span></li>;
      }

      if(currentPage < jobPages - 1) {
        nextButton = <li className="nextPage" onClick={this.nextPage}><span>Next</span></li>;
      }

      return(
        <div className='jobsPagination'>
          <ul>
            {prevButton}
            {pages}
            {nextButton}
          </ul>
        </div>
      )
    } else {
      return(<div></div>)
    }
  }
}

export default withStore(Pagination)
