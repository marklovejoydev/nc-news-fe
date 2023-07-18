import React, { useState, useEffect } from 'react';
import { getArticleById, getCommentById } from '../articleApi';
import { useParams } from 'react-router-dom';
import Loading from './Loading';
import Comments from './Comments';

export default function Article() {
  const [articleById, setArticleById] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { article_id } = useParams();
  const [comments, setComments] = useState();
  const [showComments, setShowComments] = useState(true);

  useEffect(() => {
    getArticleById(article_id)
      .then((res) => {
        setArticleById(res.data);
        setIsLoading(false);        
      })
  }, []);

  const onClickHandler = () => {
        getCommentById(article_id).then((res) => {
          setComments(res.data)
          setShowComments(false);
        });   
  }
  if (isLoading) return <Loading />

  const formattedDateTime = new Date(articleById.created_at).toLocaleString();

  return (
    <section className='articleArea'>
        <div className='container'>
      <h2 className='articleTitle'>{articleById.title}</h2>
      <p className='articleAuthor'>{articleById.author}</p>
      <p className='articleTopic'>Topic: {articleById.topic}</p>
      <p className='articleBody'>{articleById.body}</p>
      <p className='articleCommentCount'>comment count: {articleById.comment_count}</p>
      <p className='DTG'>Created on: {formattedDateTime}</p>
      <p className='votes'>votes :{articleById.votes}</p>
      <img className='articleImg' src={articleById.article_img_url}></img>
      <button className="button-4" role="button" onClick={onClickHandler}>{'Comments'}</button>
        </div>
        {comments && <div id='commentsArea'><Comments comments={comments} /></div>}
    </section>
  );
}