import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class NewsContainer extends Component {

    static defaultProps = {
        country: "in",
        pageSize: 6,
        category: "sports"
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
    }

    constructor(props) {
        super(props);
        console.log("Hello i am a constructor from news container");
        this.state = {
            articles: [],
            totalResults: null,
            loading: false,
            page: 1
        }
        document.title = `News Wale - ${this.props.category.toUpperCase()}`
    }

    async updateNews() {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.props.setProgress(30);
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        this.props.setProgress(60);
        // console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
        this.props.setProgress(100);
    }
    // Logic for prev and next button
    // handleLeftClick = async () => {
    //     this.setState({
    //         page: this.state.page - 1
    //     });
    //     this.updateNews();
    // }
    // handleRightClick = async () => {
    //     this.setState({
    //         page: this.state.page + 1
    //     });
    //     this.updateNews();
    // }

    fetchMoreData = async () => {
        this.setState(
            (prevState) => ({
                page: prevState.page + 1
            }),
            async () => {
                const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
                let data = await fetch(url);
                let parsedData = await data.json();
                console.log("New Data");
                console.log(parsedData.articles);
                this.setState((prevState) => ({
                    articles: prevState.articles.concat(parsedData.articles),
                    totalResults: parsedData.totalResults
                }), () => {
                    console.log(this.state.articles);
                    console.log(`Total results are: ${this.state.totalResults}\nno f articles on page are: ${this.state.articles.length}`);
                });
            }
        );
    };


    async componentDidMount() {
        this.updateNews();
        // console.log(this.state.totalResults);
    }

    render() {

        return (
            <>
                <h3 className='text-center heading'>{`NEWS WALE -  Top ${this.props.category === 'general' ? '' : this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} Headlines`}</h3>
                {/* {this.state.loading && <Spinner/>}*/}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length < this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">

                        <div className="row my-3">
                            {this.state.articles.map((element, index) => {
                                return <div className="col-md-4" key={index}>
                                    <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>

                {/* Below lines of code is for enabling next and prev key */}
                {/* <div className='container d-flex justify-content-between my-3'>
                    <button disabled={this.state.page <= 1 ? true : false} type="button" className="btn btn-secondary"
                        onClick={this.handleLeftClick}
                    >&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize) ? true : false} type="button" className="btn btn-secondary"
                        onClick={this.handleRightClick}
                    >Next &rarr;</button> */}
                {/* {console.log(Math.ceil(this.state.totalResults / 21))} */}
                {/*</div> */}
            </>
        )
    }
}

export default NewsContainer
