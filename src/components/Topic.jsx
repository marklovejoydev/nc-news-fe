import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getTopics } from '../articleApi';

export default function Topic() {
	const [topics, setTopics] = useState([])

	useEffect(() => {
		getTopics().then((res) => {
			setTopics(res);
		});
	}, []);
return(
    <main className='content'>
    <div className='topicHeader'>
    <h2>Topics</h2>
    </div>
    <section className='topicArea' >
      {topics.map((topic) => {
        const { slug, description } = topic;
        return (
          <ul key={slug} className="topic_links">
            <li className='content'>
              <Link to={`/topics/${slug}`} key={slug}>
              <div className='article-meta'>
                <button className='topicButton'>
                <h2>{slug}</h2>
                <p>{description}</p>
                 </button>
                </div>
              </Link>
            </li>
          </ul>
        );
      })}
    </section>
  </main>
);
}

