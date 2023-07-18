import React, { useState } from 'react'
import { postComment } from '../articleApi'
import { useParams } from 'react-router-dom';
import {Link} from 'react-router-dom'

export default function NewComment() {
const { article_id } = useParams();
  const [comment, setComment] = useState({
    username: "",
    body:"",
  })
  const [showLink, setShowLink] = useState(false)
  
  const handleSubmit = (e) => {
    e.preventDefault();
    postComment(comment, article_id)
      .then(() => {
        setComment({
          username: "",
          body: "",
        });
        alert("Comment Posted");
        setShowLink(true)
      })
      .catch((error) => {
        console.log('error in submit', error);
      });
  }
  const handleChange = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value})
  }


    return (
    <div>
        <h1>New Comment</h1>
        <form className="comment_form" onSubmit={handleSubmit}>
				<label>
					Username:
					<input
						required
						type="text"
						onChange={handleChange}
						name="username"
						value={comment.username}
					/>
				</label>
				<label>
					Comment:
					<input
						required
						type="text"
						onChange={handleChange}
						name="body"
						value={comment.body}
					/>
				</label>
                <button>Submit</button>
			</form>
            {showLink && (
        <Link className="link" to={`/articles/${article_id}`}>
          <button>Comments</button>
        </Link>
      )}
    </div>
  )
}
