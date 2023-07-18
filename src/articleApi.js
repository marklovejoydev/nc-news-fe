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