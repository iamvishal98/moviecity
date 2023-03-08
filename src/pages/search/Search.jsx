import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { fetchDataFromApi } from '../../utils/api';
import ContentWrapper from '../../components/contentwrapper/ContentWrapper'
import './search.scss';
import InfiniteScroll from 'react-infinite-scroll-component';
import MovieCard from '../../components/movieCard/MovieCard';
import Spinner from '../../components/spinner/Spinner';

const Search = () => {
  const [data ,setData] = useState(null);
  const [pageNum,setPageNum] = useState(1);
  const [loading , setLoading]=useState(false);
  const {query} = useParams();

  const fetchData = () => {
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=1`).then((res) => {
      setData(res);
      setPageNum((prev) => prev + 1);
      setLoading(false)
    })
  };

  const fetchDataFromNextPage = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then((res) => {
      if(data?.results) {
        setData({
          ...data,results:[...data?.results , ...res.results]
        })
      } else{
        setData(res);
      }
      setPageNum((prev) => prev + 1);
    })

  }

  useEffect(() => {
    setPageNum((prev) => prev = 1);
    fetchData();
  },[query])

  return (
    <div className='searchResultsPage'>
      {loading && <Spinner />}
      {!loading && 
       <ContentWrapper>
         {data?.results.length >0 ? (
          <>
          <div className="pageTitle">
            {`Search ${data.total_results > 1 ? "results" : "result"} of ${query}`}
          </div>
          <InfiniteScroll 
          className='content'
          dataLength={data?.results.length || []}
          next={fetchDataFromNextPage}
          hasMore={pageNum <= data?.total_pages}
          loader={<Spinner/>}
          >
            {data.results.map((item,index) => {
              if(item.media_type === "person") return ;
              return (
                <MovieCard key={index} data={item} fromSearch={true} />
              )
            })}
          </InfiniteScroll>
          </>
         )
         :
         (<span style={{color:'white'}}>Results not found</span>) }
       </ContentWrapper>
        }
    </div>
  )
}

export default Search