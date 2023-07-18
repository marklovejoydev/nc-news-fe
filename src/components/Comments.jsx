import React from 'react'

export default function Comments({comments}) {
    if (comments.length === 0) {
        return (
          <div>
            <h1>Comments</h1>
            <ul>
              <li className="no_comment">
                <div>
                  <h3>No Comments</h3>
                  <p>Be the first!</p>
                  <button>Comment</button>
                </div>
              </li>
            </ul>
          </div>
        );
      }
  return (
    <div>
        <h1>comments</h1>
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
