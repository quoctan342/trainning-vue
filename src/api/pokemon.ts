import * as api from './apiClient';

const pokemonAPI = {
    getAll() {
        const url = 'pokemon/';
        return api.get(url, {
            params: {
                offset: 0,
                limit: 12,
            },
        });
    },
    getOne(url: string) {
        return api.get(url, {});
    },
    getOneByName(name: string) {
        const url = `pokemon/${name}`;
        return api.get(url, {});
    },
};

export default pokemonAPI;
