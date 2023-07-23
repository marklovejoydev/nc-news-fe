import axios from "axios";

const myApi = axios.create({
	baseURL: "https://nc-news-ml.onrender.com/api",
});



export const getArticleById = (article_Id) => {
	return myApi.get(`/articles/${article_Id}`).then((res) => {
		return res;
	});
};

export const getCommentById = (article_Id) => {
	return myApi.get(`articles/${article_Id}/comments`).then((res) => {
		
		return res
	})
}

export const patchArticleVotesUp = (article_Id) => {
	const data = { inc_votes: 1 };
	return myApi.patch(`/articles/${article_Id}`, data)
	  .then((res) => {
		return res.data
	  })
  };
  export const patchArticleVotesDown = (article_Id) => {
	const data = { inc_votes: - 1 };
	return myApi.patch(`/articles/${article_Id}`, data)
	  .then((res) => {
		return res.data
	  })
  };

  export const postComment = (newComment, article_Id) => {
	const postRequestBody = {
		username:newComment.username,
		body:newComment.body
	}
	return myApi.post(`/articles/${article_Id}/comments`, postRequestBody).then(({data})=> {
		return data
	})
}

export const getTopics = () => {
	return myApi.get('/topics').then(({data})=>{

		return data.topics
	})
}
export const deleteComment = (comment_id) => {
	return myApi.delete(`/comments/${comment_id}`).then((res) => {
	  return res.data;
	});
  };