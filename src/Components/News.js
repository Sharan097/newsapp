import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types';

export class News extends Component {
  // No need of 'constructor()' here we r using 'async componentDidMount()' by fetching  data from News API.

  //insert class-based components in PropTypes.
  static defaultProps = {
    country: "us",
    pageSize: 5,
    category : 'general'
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize : PropTypes.number,
    category : PropTypes.string
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
  constructor(props) {
    super(props)
    console.log("I'm a constructor from News Component")
    this.state = {
      articles : [],
      loading : false,
      page : 1
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`
  }                                                           // 'articles' array: This is an array of objects that contain news article data, such as title, description, URL, and image URL.


  /* Example (for constructor() and this.state() :=  Think of it like a box where you store your toys.
  The constructor() method is like opening the box and putting the toys inside. 
  The this.state object is like the box itself, where you can store and retrieve your toys (data) as needed.
  */


async  componentDidMount() {
  console.log("cdm")
  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=29c9b17573a94bfea5f85b2efe8acf69&page=1&pageSize=${this.props.pageSize}`;
  let data = await fetch(url);
  let parsedData = await data.json();
  console.log(parsedData);
  this.setState({articles:parsedData.articles , totalResults:parsedData.totalResults})                             // Updates the empty news articles.
}


handlePrevClick = async() => {
  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=29c9b17573a94bfea5f85b2efe8acf69&page=${this.state.page - 1}&pageSize=${this.props.pageSize} `;
  let data = await fetch(url);
  let parsedData = await data.json();
  console.log(parsedData);
  this.setState({
    page : this.state.page - 1,
    articles:parsedData.articles
  })
}

handleNextClick = async() => {
  console.log("next");
  if (this.state.page + 1 > Math.ceil(this.totalResults/this.props.pageSize)){                                  // means the page we want to go > then our all pages

  }
  else {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=29c9b17573a94bfea5f85b2efe8acf69&page=${this.state.page + 1}&pageSize=${this.props.pageSize} `;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      page : this.state.page + 1,
      articles:parsedData.articles
    })
}
}


  render() {
    console.log("render")
    return (
      <div className='container my-4'>
        <h2 style={{textAlign:'center', marginTop:"90px"}}>NewsMonkey - Top Headlines</h2>
        <div className="row">
        {this.state.articles.map((element)=>{
          return <div className="col-md-4 " key={element.url}>
            <NewsItem title={element.title?element.title.slice(0,40):""} description={element.description?element.description.slice(0,55):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
          </div>
        })}
        </div>
        <div className='container d-flex justify-content-between'>
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
          <button disabled={(this.state.page + 1 > Math.ceil(this.totalResults/this.props.pageSize))} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> 
      </div>                                           // &larr; <- left arrow , &rarr; -> right arrow (a html code to show)

    )
  }
}

export default News

