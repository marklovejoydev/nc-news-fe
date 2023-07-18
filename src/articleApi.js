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