import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from './components/Loading';
import { Link } from 'react-router-dom';
import { getArticles } from './requestApi';
import { useSearchParams } from 'react-router-dom';
import Expanding from './components/Expanding';

export default function SingleTopic() {
  const { topic } = useParams();
  const [topicArticles, setTopicArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const sortQuery = searchParams.get('sort_by') + ':' + searchParams.get('order');

  const setSortOrder = (sortBy, direction) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('sort_by', sortBy);
    newParams.set('order', direction);
    setSearchParams(newParams);
  };

  useEffect(() => {
    const initialSortBy = searchParams.get('sort_by') || 'created_at';
    const initialOrder = searchParams.get('order') || 'ASC';
    const initialSortQuery = initialSortBy + ':' + initialOrder;

    getArticles(topic, ...initialSortQuery.split(':'))
      .then((res) => {
        setTopicArticles(res);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching articles:', error);
        setIsLoading(false);
      });
  }, [topic, searchParams]);

  useEffect(() => {
    
    if (topicArticles.length > 0 && sortQuery) {
      sortArticles();
    }
  }, [sortQuery]);

  const sortArticles = () => {
    const [sortBy, direction] = sortQuery.split(':');
    const sortedArticles = [...topicArticles];
    sortedArticles.sort((a, b) => {
      if (direction === 'ASC') {
        return a[sortBy] - b[sortBy];
      } else {
        return b[sortBy] - a[sortBy];
      }
    });
    setTopicArticles(sortedArticles);
  };

  if (isLoading) return <Loading />;

  return (
    <main className='content'>
      <div className='topicHeader'>
        <h2>{`${topic}`}</h2>
        <section>
          <Expanding>
            <div className='spacer'></div>
            <label>Sort By:</label>
            <select
              value={sortQuery}
              onChange={(e) => {
                setSortOrder(...e.target.value.split(':'));
              }}
            >
              <option value='created_at:ASC'>Date (ASC)</option>
              <option value='created_at:DESC'>Date (DESC)</option>
              <option value='votes:ASC'>Votes (ASC)</option>
              <option value='votes:DESC'>Votes (DESC)</option>
            </select>
          </Expanding>
        </section>
      </div>
      <ul className='content'>
        {topicArticles.map(({ article_id, title, author, votes, created_at }) => {
          const formattedDateTime = new Date(created_at).toLocaleString();
          return (
            <li className='container flex_div' key={article_id}>
              <h3>Title: {title}</h3>
              <p>
                Author: {author} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Topic: {topic}
              </p>
              <p>Created on: {formattedDateTime}</p>
              <p>votes: {votes}</p>
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
    </main>
  );
}