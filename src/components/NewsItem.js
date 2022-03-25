
import React from 'react'

const NewsItem = (props)=> {

 
    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    return (
      <div className="card" >
        <div style={{
          displey: 'flex',
          justifyContent: 'flex-end',
          position: 'absolute',
          right: '0'
        }}>
          <span className="badge rounded-pill bg-danger">
            {source}
          </span>
        </div>
        <img src={imageUrl ? imageUrl : "https://img.etimg.com/thumb/msid-90331779,width-1070,height-580,overlay-economictimes/photo.jpg"} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}... </h5>
          <p className="card-text">{description}...</p>
          <p className="card-text"><small className="text-muted">By {author ? author : "Unknown"} on {new Date(date).toGMTString()}</small></p>
          <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-dark">Go somewhere</a>
        </div>
      </div>
    )
  
}

export default NewsItem
