import React, { Component } from 'react'
import defaultImage from '../newsImage.png'
export class NewsItem extends Component {
    handleImageError = (event) => {
        event.target.src = defaultImage;
      }

    render() {
        let { title, description, imageUrl, newsUrl, author, date, source } = this.props;

        return (
            <div className='my-3'>
                <div className="card" style={{ margin: "auto" }} id='card'>
                    <div className="d-flex justify-content-end" style={{position:'absolute', right: '0'}}>
                        <span className="badge rounded-pill bg-danger" id='badge'>{source}</span>
                    </div>
                    <img src={imageUrl ? imageUrl : defaultImage} className="card-img-top" alt="..." onError={this.handleImageError}/>
                    <div className="card-bod y">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-body-secondary">By {author ? author : "Unknown"} on {new Date(date).toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })} </small></p>
                        <a href={newsUrl} className="btn btn-sm btn-primary" target='0'>Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
