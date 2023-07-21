import React, { useState, useEffect } from 'react'
import { getArticles } from '../requestApi';
import { Link } from 'react-router-dom';
import Loading from './Loading';

export default function ArticleList() {
	const [articles, setArticles] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
  
	useEffect(() => {
	  getArticles()
		.then((res) => {
		  setArticles(res);
		  setIsLoading(false);
		})
		
	}, []);
  
    if (isLoading) return <Loading />
    return (
    
		<main className='content'>
			<h2 className='subheader'>ALL ARTICLES</h2>
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

