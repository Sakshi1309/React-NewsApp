import React, { Component } from 'react'

export default class NewsList extends Component {

    render() {

        let { title, description, imageUrl, newsUrl, author, date, source } = this.props;

        return (
            <div className='my-2'>
                <div className="card">
                    <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:"90%"}}>{source}</span>
                    <img style={{ height: "200px", width: "354px" }} src={imageUrl ? imageUrl : "https://www.aljazeera.com/wp-content/uploads/2022/09/2022-09-19T203402Z_1215403949_RC2JKW94EMRY_RTRMADP_3_SPACE-EXPLORATION-MARS.jpg?resize=1920%2C1440"} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className='text-muted'>By {author ? author : 'Unknown'} on {new Date(date).toGMTString()}</small></p>
                        <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark" >Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}
