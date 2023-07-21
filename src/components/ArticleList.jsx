import React, { useState, useEffect } from 'react'
import { getArticles } from '../requestApi';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { useSearchParams } from 'react-router-dom';
import Expanding from './Expanding';

export default function ArticleList() {
	const [articles, setArticles] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [searchParams, setSearchParams] = useSearchParams()
	const sortByQuery = searchParams.get('sort_by');
  	const orderQuery = searchParams.get('order');

	const setSortOrder = (sortBy, direction) => {
		const newParams = new URLSearchParams(searchParams)
		newParams.set('sort_by', sortBy)
		newParams.set('order', direction)
		setSearchParams(newParams)
	}

	useEffect(() => {
		getArticles(null, sortByQuery, orderQuery)
		.then((res) => {
		  setArticles(res);
		  setIsLoading(false);
		})
		
	}, [sortByQuery, orderQuery]);
  
    if (isLoading) return <Loading />
    return (
    
		<main className='content'>
			<h2 className='subheader'>ALL ARTICLES</h2>
			<section>
    		<Expanding>
			<div className="spacer"></div>
    		<button onClick={() => setSortOrder('created_at', 'ASC')}>Sort by Date (ASC)</button>
      		<button onClick={() => setSortOrder('created_at', 'DESC')}>Sort by Date (DESC)</button>
      		<button onClick={() => setSortOrder('comment_count', 'ASC')}>Sort by Comment Count (ASC)</button>
      		<button onClick={() => setSortOrder('comment_count', 'DESC')}>Sort by Comment Count (DESC)</button>
      		<button onClick={() => setSortOrder('votes', 'ASC')}>Sort by Votes (ASC)</button>
      		<button onClick={() => setSortOrder('votes', 'DESC')}>Sort by Votes (DESC)</button>
			</Expanding>
  			</section>
			<section>
				<ul className='content'>
					{articles.map(({article_id, title, author, topic}) => {
						return (
							<li className="container flex_div" key={article_id}>
								<h3>Title: {title}</h3>
							
                                <p>Author: {author}</p>
								
								<p>Topic: {topic}</p>
								
								<Link to={`/articles/${article_id}`}>
                                <button>Read More</button>
				  				</Link>
								  <div className="spacer"></div>
								  <div className='article-meta'></div>
								  <div className="spacer"></div>
							</li>
						);
					})}
				</ul>
			</section>
		</main>
	);
}

