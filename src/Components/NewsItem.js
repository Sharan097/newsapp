import React, { Component } from 'react';
import PropTypes from 'prop-types';


export class NewsItem extends Component {

  render() {
    const { title, description, imageUrl , newsUrl , author , date , source} = this.props;
    return (
      <div className='my-3'>
        <div className="card" >
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: "90%" , zIndex:"1"}}>{source}</span>
            <img src={imageUrl?imageUrl:"https://s.yimg.com/ny/api/res/1.2/ywXsMOt5MbTiME97E7qUiQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD04MDA-/https://s.yimg.com/os/creatr-uploaded-images/2024-10/82854e90-857f-11ef-b1dd-46212dd566a0"} class="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}... </h5>
                <p className="card-text">{description}...</p>
                <p className="card-text"><small>By {author?author:"Unknown"} on {new Date(date).toGMTString()} </small></p>
                <a  rel="noreferrer" href={newsUrl} target='_blank' className="btn btn-sm btn btn-dark">Read more</a>  
            </div>
        </div>
      </div>
    );
  }

// target='_blank' => always write in href position , USED to open article or page in new Tab .


  static propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  };

}
export default NewsItem;