import axios from "axios";

const myApi = axios.create({
	baseURL: "https://nc-news-ml.onrender.com/api",
});

export const getArticles = (topic) => {
	return myApi.get(`/articles`, {
		params: {
		  topic:topic
		}
		})
		.then(({ data }) => {
		return data.articles;
	});
};

