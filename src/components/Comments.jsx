import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import { useParams } from 'react-router-dom';
import NewComment from './NewComment'


export default function Comments({comments}) {
    const { article_id } = useParams()
    const [showNewComment, setShowNewComment] = useState(false)
    const [newComment, setNewComment] = useState(null)
    
    const handleNewComment = (comment) => {
        setNewComment(comment);
      };
    
    if (comments.length === 0) {

        return (
          <div>
            <h1>Comments</h1>
            <ul>
              <li className="no_comment">
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
    <div>
        <h1>comments</h1>
        <button onClick={() => setShowNewComment(true)}>New Comment</button>
        {showNewComment && <NewComment handleNewComment={handleNewComment} />}
        {newComment && (
        <div className="list_comment">
          <div className="comment-header">
            <h3 className="comment-author">Author: {newComment.username}</h3>
          </div>
          <div className="comment-body">
            <p>{newComment.body}</p>
            <button type="button">Vote up</button>
          </div>
        </div>
        )}
        <ul>
        {comments.map(({comment_id, body, author, votes}) => {            
			return (
				<li className="list_comment" key={comment_id}>
                    <div className='comment-header'>
                    <h3 className="comment-author">Author: { author }</h3>
					<p>
                    • Votes:{votes} •
                    </p>
                    </div>
                    <div className='comment-body'>
                    <p>{body}</p>
                    <button type="button">Vote up</button>
                    </div>
				</li>
				);
			})}
        </ul>
       
    </div>
  )
}
