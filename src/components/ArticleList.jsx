import React, { useState, useEffect } from 'react';
import { getArticles } from '../requestApi';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { useSearchParams } from 'react-router-dom';
import Expanding from './Expanding';

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortQuery, setSortQuery] = useState('created_at:ASC'); 
  const [apiError, setApiError] = useState(null)

  useEffect(() => {
    getArticles(null, ...sortQuery.split(':'))
      .then((res) => {
        setArticles(res);
        setIsLoading(false);
      })
      .catch((error)=>{
        setApiError(error)
        console.log(error.response.status)
        console.log(error.response.data.msg)
    
        setIsLoading(false);
      });
  }, [sortQuery]);

  useEffect(() => {
    if (articles.length > 0 && sortQuery) {
      sortArticles();
    }
  }, [ sortQuery]);

  const sortArticles = () => {
    const [sortBy, direction] = sortQuery.split(':');
    const sortedArticles = [...articles];
    sortedArticles.sort((a, b) => {
      if (direction === 'ASC') {
        return a[sortBy] - b[sortBy];
      } else {
        return b[sortBy] - a[sortBy];
      }
    });
    setArticles(sortedArticles);
  };

  if (isLoading) return <Loading />;
  if(apiError){
	return (
		<ErrorPage
		errorStatus={apiError.response.status}
		errorMessage={apiError.response.data.msg}
		/>
	)
}
  return (
    <main className='content'>
      <h2 className='topicHeader'>ALL ARTICLES</h2>
      <section className='topicArea'>
        <Expanding>
          <div className='spacer'></div>
          <label>Sort By:</label>
          <select
            value={sortQuery}
            onChange={(e) => {
              setSortQuery(e.target.value);
            }}
          >
            <option value='created_at:ASC'>Date (ASC)</option>
            <option value='created_at:DESC'>Date (DESC)</option>
            <option value='comment_count:ASC'>Comment Count (ASC)</option>
            <option value='comment_count:DESC'>Comment Count (DESC)</option>
            <option value='votes:ASC'>Votes (ASC)</option>
            <option value='votes:DESC'>Votes (DESC)</option>
          </select>
        </Expanding>
      </section>
      <section>
        <ul className='content'>
          {articles.map(({ article_id, title, author, topic, comment_count, created_at, votes }) => {
            const formattedDateTime = new Date(created_at).toLocaleString();
            return (
              <li className='container flex_div' key={article_id}>
                <h3>Title: {title}</h3>
                <p>Author: {author}</p>
                <p>Topic: {topic}</p>
                <p>votes: {votes}</p>
                <p>Created on: {formattedDateTime}</p>
                <p>Comment Count: {comment_count}</p>
                <Link to={`/articles/${article_id}`}>
                  <button>Read More</button>
                </Link>
                <div className='spacer'></div>
                <div className='article-meta'></div>
                <div className='spacer'></div>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}