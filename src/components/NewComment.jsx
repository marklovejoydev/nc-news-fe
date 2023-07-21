import React, { useState } from 'react'
import { postComment } from '../articleApi'
import { useParams } from 'react-router-dom';

export default function NewComment({handleNewComment}) {
const { article_id } = useParams();
  const [comment, setComment] = useState({
    username: "tickle122",
    body:"",
  })

  
  const handleSubmit = (e) => {
    e.preventDefault();
    handleNewComment(comment)
    postComment(comment, article_id)
      .then(() => {
        setComment({
          username: "tickle122",
          body: "",
        });
        alert("Comment Posted");
      })
      .catch((error) => {
        console.log('error in submit', error);
        alert("Your comment could not be posted please try again later")
        handleNewComment(null)
      });
  }
  const handleChange = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value})
  }


    return (
    <div className='content'>
        <h2>New Comment</h2>
        <form className="comment_form" onSubmit={handleSubmit}>
				
				<label className='label'>
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
            
      
    </div>
  )
}
