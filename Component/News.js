import React, { Component } from 'react';
import NewsList from './NewsList';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import apiData from '../api.json';

export default class News extends Component {
  static propsTypes = {
    pageSize: PropTypes.number,
    category: PropTypes.string,
    country: PropTypes.string,
  };

  static defaultProps = {
    pageSize: 6,
    category: 'general',
    country: 'in',
  };

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
      index: 1,
    };
  }

  componentDidMount() {
    this.getNewsData(this.state.page);
  }

  handleNextClick = () => {
    if (
      this.state.page + 1 >
      Math.ceil(this.state.totalResults / this.props.pageSize)
    ) {
    } else {
      this.getNewsData(this.state.page + 1);
    }
  };

  handlePrevClick = () => {
    this.getNewsData(this.state.page - 1);
  };

  getNewsData = async (pageNum) => {
    console.log('getNewsData');
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=e291445819294b1c9b1228c92edafeb1&page=${pageNum}&pageSize=${this.props.pageSize}`;
    // let data = await fetch(url);
    // let parseData = await data.json();
    let parseData = apiData;
    await this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false,
    });
    console.log(
      this.state.articles,
      this.state.totalResults,
      this.state.loading,
      this.state.page
    );
  };

  capitalize = (string) => {
    let newString = string.charAt(0).toUpperCase() + string.slice(1);
    return newString;
  };

  fetchMoreData = async (pageNum) => {
    await this.setState({ page: pageNum });
    if (pageNum > 1) {
      // const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=e291445819294b1c9b1228c92edafeb1&page=${pageNum}&pageSize=${this.props.pageSize}`;
      // let data = await fetch(url);
      // let parseData = await data.json();
      let parseData = apiData;
      let articlesData = this.state.articles.concat(parseData.articles);
      await this.setState({
        articles: articlesData,
        totalResults: parseData.totalResults,
      });
    }
  };

  render() {
    return (
      <div className="container">
        <h3 className="my-4 text-center">{`Today's Top ${this.capitalize(
          this.props.category
        )} Headlines - ${new Date().toDateString()}`}</h3>
        {this.state.loading && <Spinner />}
        {/* <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={()=>this.fetchMoreData(this.state.page + 1)}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row my-3">
                            {this.state.articles && this.state.articles.map((element) => {
                                return <div className="col-md-4 my-2">
                                    <NewsList title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} source={element.source.name} date={element.publishedAt} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll> */}
        {!this.state.loading && (
          <div className="row my-3">
            {this.state.articles &&
              this.state.articles.map((element) => {
                return (
                  <div className="col-md-4 my-2" key={element.urlToImage}>
                    <NewsList
                      title={element.title}
                      description={element.description}
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      source={element.source.name}
                      date={element.publishedAt}
                    />
                  </div>
                );
              })}
          </div>
        )}
        <div className="container d-flex justify-content-between mb-4">
          <button
            disabled={this.state.page <= 1}
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &#8592; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &#8594;
          </button>
        </div>
      </div>
    );
  }
}
