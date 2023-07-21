import React, { useState, useEffect } from 'react';
import { getArticleById, getCommentById, patchArticleVotesUp, patchArticleVotesDown} from '../articleApi';
import { useParams } from 'react-router-dom';
import Loading from './Loading';
import Comments from './Comments';

export default function Article() {
  const [articleById, setArticleById] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { article_id } = useParams();
  const [comments, setComments] = useState();
  const [showComments, setShowComments] = useState(true);
  const [votes, setVotes] = useState(0)
  const [isButtonClicked, setIsButtonClicked] = useState(false)
    
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
          setIsLoading(false);
        });   
  }

  const handleUpVotes = () => {
    if (!isButtonClicked) {
    const originalVote = currentVote - 1
    setVotes(votes + 1)
    setIsButtonClicked(true)
    patchArticleVotesUp(article_id) 
    .catch((error) => {
        console.log('Error while voting up:', error);
        setVotes(votes)
        alert('Something went wrong. Please try again later.')
        setIsButtonClicked(false)
      })
}
};

const handleDownVotes = () => {
    if (!isButtonClicked) {
    setVotes(votes - 1)
    setIsButtonClicked(true)
    patchArticleVotesDown(article_id) 
    .catch((error) => {
        console.log('Error while voting down:', error);
        setVotes(votes)
        alert('Something went wrong. Please try again later.')
        setIsButtonClicked(false)
      })
}
};
  if (isLoading) return <Loading />

  const formattedDateTime = new Date(articleById.created_at).toLocaleString();
    const currentVote = articleById.votes
  return (
    <section className='content'>
        <div className='container'>
      <h2 className='articleTitle'>{articleById.title}</h2>
      <p className='articleAuthor'>{articleById.author}</p>
      <p className='articleTopic'>Topic: {articleById.topic}</p>
      <p className='articleBody'>{articleById.body}</p>
      <p className='articleCommentCount'>comment count: {articleById.comment_count}</p>
      <p className='DTG'>Created on: {formattedDateTime}</p>
      <p className='votes'>votes :{currentVote + votes}</p>
      <button className="voteUpButton" role="button" onClick={handleUpVotes} disabled={isButtonClicked}>
        {'Vote up'}
        </button>
        <button className="voteDownButton" role="button" onClick={handleDownVotes} disabled={isButtonClicked}>
        {'Vote down'}
        </button>
      <img className='articleImg' src={articleById.article_img_url}></img>
      <button className="button-4" role="button" onClick={onClickHandler}>{'Comments'}</button>
        </div>
        {comments && <div id='commentsArea'><Comments comments={comments} /></div>}
    </section>
  );
}