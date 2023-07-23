import axios from "axios";

const myApi = axios.create({
	baseURL: "https://nc-news-ml.onrender.com/api",
});

export const getArticles = (topic, sortBy, order) => {
	return myApi
	  .get("/articles", {
		params: {
		  topic: topic,
		  sort_by: sortBy,
		  order: order,
		},
	  })
	  .then(({ data }) => {
		return data.articles;
	  });
  };
