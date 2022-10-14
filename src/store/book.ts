import { Book } from '@/types/index';

const state = {
    books: [
        {
            title: 'Sách số 1',
            author: 'Nguyễn Nhật Ánh',
            category: 'Văn học thiếu nhi',
            cost: 111000,
            sale: 26,
            img: 'https://salt.tikicdn.com/cache/w444/ts/product/a2/57/b6/cac2e0ac6f4395d400d29f1aba941d68.jpg',
        },
        {
            title: 'Sách số 2',
            author: 'Nguyễn Nhật Ánh',
            category: 'Văn học thiếu nhi',
            cost: 111000,
            sale: 26,
            img: 'https://salt.tikicdn.com/cache/w444/ts/product/a2/57/b6/cac2e0ac6f4395d400d29f1aba941d68.jpg',
        },
        {
            title: 'Sách số 3',
            author: 'Nguyễn Nhật Ánh',
            category: 'Văn học thiếu nhi',
            cost: 111000,
            sale: 26,
            img: 'https://salt.tikicdn.com/cache/w444/ts/product/a2/57/b6/cac2e0ac6f4395d400d29f1aba941d68.jpg',
        },
    ] as Book[],
};
const getters = {};

const mutations = {
    ADD_BOOK(state: any, payload: Book): void {
        state.books.push(payload);
    },
};

const actions = {};

export default {
    state,
    mutations,
    getters,
    actions,
    namespaced: true,
};
