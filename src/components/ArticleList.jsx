import React, { useState, useEffect } from 'react'
import { getArticles } from '../requestApi';

export default function ArticleList() {
    const [articles, setArticles] = useState()
    const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
		getArticles().then((res) => {
			setArticles(res);
            setIsLoading(false)
		});
	}, []);
    if (isLoading) return <p>Loading...</p>
    return (
    
		<main>
			<h2 className='subheader'>ALL ARTICLES</h2>
			<section>
				<ul>
					{articles.map(({article_id, title, author, topic}) => {
						return (
							<li className="list_article" key={article_id}>
								<h3>Title: {title}</h3>
                                <p>Author: {author}</p>
								<p>Topic: {topic}</p>
                                <button>Read More</button>
							</li>
						);
					})}
				</ul>
			</section>
		</main>
	);
}
