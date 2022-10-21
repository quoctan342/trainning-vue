import * as api from "./apiClient";

const jokeAPI: Object = {
  getJoke() {
    return api.get("", {});
  },
  getJokeByID(id: string) {
    const path: string = `j/${id}`;
    return api.get(path, {});
  },
  getJokeByWords(words: string) {
    const path: string = "search";
    return api.get(path, {
      params: {
        page: 1,
        limit: 30,
        term: words,
      },
    });
  },
};

export default jokeAPI;
