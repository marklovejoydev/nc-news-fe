import React from 'react'

export default function Comments({comments}) {
    console.log(comments)
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
