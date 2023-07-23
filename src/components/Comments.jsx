import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import NewComment from './NewComment';
import { deleteComment, getCommentById } from '../articleApi';

export default function Comments({comments, setComments}) {
  const { article_id } = useParams();
  const [showNewComment, setShowNewComment] = useState(false);
  const [newComment, setNewComment] = useState(null);
  const [commentList, setCommentList] = useState(comments);

  const handleNewComment = (comment) => {
    setNewComment(comment);
  };

  const handleDeleteComment = (comment_id) => {
    const updatedComments = commentList.filter((comment) => comment.comment_id !== comment_id);
    setComments(updatedComments);

    deleteComment(comment_id)
      .then(() => {
        setComments(updatedComments)
        alert("your comment has been deleted")
      })
      .catch((error) => {
        console.error('Error deleting comment:', error);

        fetchComments();
      });
  };


  if (comments.length === 0) {
    return (
      <div className='content'>
        <h2>Comments</h2>
        <ul>
          <li className='no_comment'>
            <div>
              <h3>No Comments</h3>
              <p>Be the first!</p>
              <button onClick={() => setShowNewComment(true)}>Comment</button>
            </div>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div className='content'>
      <h2>comments</h2>
      <div className='content'>
        <button onClick={() => setShowNewComment(true)}>New Comment</button>
        {showNewComment && <NewComment handleNewComment={handleNewComment} />}
        {newComment && (
          <div className='list_comment'>
            <div className='comment-header'>
              <h3 className='comment-author'>Author: {newComment.username}</h3>
            </div>
            <div className='comment-body'>
              <p>{newComment.body}</p>
              <button type='button'>Vote up</button>
            </div>
          </div>
        )}
        <ul>
          {comments.map(({ comment_id, body, author, votes }) => {
            const isAuthorTickle122 = author === 'tickle122';
            return (
              <div key={comment_id}>
                <li className='list_comment'>
                  <div className='comment-header'>
                    <h3 className='comment-author'>Author: {author}</h3>
                    <p>• Votes: {votes} •</p>
                    {isAuthorTickle122 && (
                      <button type='button' onClick={() => handleDeleteComment(comment_id)}>
                        Delete
                      </button>
                    )}
                  </div>
                  <div className='comment-body'>
                    <p>{body}</p>
                    <button type='button'>Vote up</button>
                  </div>
                </li>
                <div className='spacer'></div>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}