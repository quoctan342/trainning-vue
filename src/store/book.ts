import { Book, BookState } from "@/types/index";

const state: BookState = {
  books: [
    {
      id: 1,
      title: "Sách số 1",
      author: "Nguyễn Nhật Ánh",
      category: "Văn học thiếu nhi",
      cost: 111000,
      sale: 26,
      publishingdate: "2022-10-09",
    },
    {
      id: 2,
      title: "Sách số 2",
      author: "Nguyễn Nhật Ánh",
      category: "Văn học thiếu nhi",
      cost: 111000,
      sale: 26,
      publishingdate: "2022-10-09",
    },
    {
      id: 3,
      title: "Sách số 3",
      author: "Nguyễn Nhật Ánh",
      category: "Văn học thiếu nhi",
      cost: 111000,
      sale: 26,
      publishingdate: "2022-10-09",
    },
  ] as Book[],
};
const getters = {};

const mutations = {
  ADD_BOOK(state: BookState, payload: Book): void {
    state.books.push(payload);
  },
  UPDATE_BOOK(state: BookState, payload: Book): void {
    for (const book of state.books) {
      if (book.id === payload.id) {
        if (book.title != payload.title) book.title = payload.title;
        if (book.author != payload.author) book.author = payload.author;
        if (book.category != payload.category) book.category = payload.category;
        if (book.cost != payload.cost) book.cost = payload.cost;
        if (book.sale != payload.sale) book.sale = payload.sale;
        if (book.publishingdate != payload.publishingdate)
          book.publishingdate = payload.publishingdate;
      }
    }
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
