import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from './components/Loading'
import { Link } from 'react-router-dom'
import { getArticles } from './requestApi'


export default function SingleTopic() {
 const {topic} = useParams()
 const [topicArticles, setTopicArticles] = useState([])
 const [isLoading, setIsLoading] = useState(true)
 
 useEffect(()=>{
    getArticles(topic).then((res)=>{
        setTopicArticles(res)
        setIsLoading(false)
    })
 },[])
 if (isLoading) return <Loading />
    return (
        <main className='content'>
        <div className='topicHeader'>
        <h2>{`${topic}`}</h2>
        </div>
        <ul className='content'>
            {topicArticles.map(({article_id, title, author})=>{
                return(
                    <li className="container flex_div" key={article_id}>
								<h3>Title: {title}</h3>
                                <p>Author: {author}</p>
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
        

    </main>
  )
}
