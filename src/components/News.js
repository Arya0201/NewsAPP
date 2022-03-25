import React,{useEffect,useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
const News = (props)=>{
   const [articles,setArticles]= useState([])
   const [loading,setLoading]= useState(true)
   const [page,setPage]= useState(1)
   const [totalResults,setTotalResults]= useState(0)
   //document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
   
  
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
   const updateNews= async()=> {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parsedDate = await data.json();
    props.setProgress(70);
    console.log(parsedDate);
    setArticles(parsedDate.articles)
    setTotalResults(parsedDate.totalResults)
    setLoading(false)
   
    props.setProgress(100);
  }
useEffect(()=>{
document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
updateNews();
  
},[])

 
 const  fetchMoreData = async() => {
   const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1)
    let data = await fetch(url);
    let parsedDate = await data.json();
    console.log(parsedDate);
    setArticles(articles.concat(parsedDate.articles))
    setTotalResults( parsedDate.totalResults)
    
  };
 
    return (
        <>
        <h1 className='text-center' style={{ margin: '35px 0px',marginTop:'90px' }}>NewsMonkey - Top  {capitalizeFirstLetter(props.category)} Headline</h1>
         {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!==totalResults}
          loader={<Spinner/>}
        >
         <div className="container">
          <div className="row">
            {articles.map((element) => {
              return <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title ? element.title.slice(0, 45) : ""} imageUrl={element.urlToImage} description={element.description ? element.description.slice(0, 88) : ""} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
              </div>
            })}
          </div>
          </div>
        </InfiniteScroll>
        
        </>
    )
  
}
News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general"
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}


export default News
