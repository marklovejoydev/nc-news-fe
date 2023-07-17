import axios from "axios";

const myApi = axios.create({
	baseURL: "https://nc-news-ml.onrender.com/api",
});

export const getArticles = () => {
	return myApi.get(`/articles`).then(({ data }) => {
		return data.articles;
	});
};

