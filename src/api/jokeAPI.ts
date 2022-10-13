import * as api from './apiClient';

const jokeAPI = {
    getJoke() {
        return api.get('', {});
    },
    getJokeByID(id: string | number) {
        const path = `j/${id}`;
        return api.get(path, {});
    },
    getJokeByWords(words: string) {
        const path = 'search';
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
