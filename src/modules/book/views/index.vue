<template>
  <div>
    <h2>Book page</h2>
    <div class="btn-group">
      <button
        @click="toggleModalAddBook"
        id="add-book-vuelidate"
        class="btn btn-primary"
      >
        Add new book (using Vuelidate)
      </button>
      <button
        @click="toggleModalAddBookVee"
        id="add-book-veevalidate"
        class="btn btn-primary"
      >
        Add new book (using Veevalidate)
      </button>
    </div>
    <modal-add-book-vuelidate
      v-model="modalAddBook"
      :currentLastID="books.length"
    ></modal-add-book-vuelidate>
    <modal-add-book-veevalidate
      :currentLastID="books.length"
      v-model="modalAddBookVee"
    ></modal-add-book-veevalidate>
    <div class="book-list">
      <div
        class="book-item"
        v-for="(book, index) in books"
        :key="index"
        @click="enableUpdateBook(index)"
      >
        <vue-book :item="book"></vue-book>
      </div>
      <modal-update-book
        v-model="modalUpdateBook"
        :book="books[`${bookSelected}`]"
      ></modal-update-book>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ModalAddBookVuelidate from "@/modules/book/components/modal-add-book-vuelidate.vue";
import ModalAddBookVeevalidate from "@/modules/book/components/modal-add-book-veevalidate.vue";
import { Book } from "@/types";
import VueBookTicket from "@/components/Vue-book-ticket.vue";
import { required, numeric } from "vuelidate/lib/validators";
import ModalUpdateBook from "@/modules/book/components/modal-update-book.vue";

export default Vue.extend({
  name: "Book-page",
  components: {
    "modal-add-book-vuelidate": ModalAddBookVuelidate,
    "modal-add-book-veevalidate": ModalAddBookVeevalidate,
    "vue-book": VueBookTicket,
    "modal-update-book": ModalUpdateBook,
  },
  data() {
    return {
      books: [] as Book[],
      modalAddBook: false as boolean,
      modalAddBookVee: false as boolean,
      modalUpdateBook: false as boolean,
      bookSelected: 0 as number,
    };
  },
  methods: {
    toggleModalAddBook(): void {
      this.modalAddBook = !this.modalAddBook;
    },
    toggleModalAddBookVee(): void {
      this.modalAddBookVee = !this.modalAddBookVee;
    },
    addNewBook(payload: Book): void {
      this.books.push(payload);
    },
    handleUpdateBook(payload: Book): void {
      for (const book of this.books) {
        if (book.id === payload.id) {
          if (book.title != payload.title) book.title = payload.title;
          if (book.author != payload.author) book.author = payload.author;
          if (book.category != payload.category)
            book.category = payload.category;
          if (book.cost != payload.cost) book.cost = payload.cost;
          if (book.sale != payload.sale) book.sale = payload.sale;
          if (book.publishingdate != payload.publishingdate)
            book.publishingdate = payload.publishingdate;
        }
      }
    },
    enableUpdateBook(index: number): void {
      this.bookSelected = index;
      this.modalUpdateBook = true;
    },
  },
  created(): void {
    this.books.push({
      id: 1,
      title: "sas",
      author: "Nguyễn Nhật Ánh",
      category: "Văn học thiếu nhi",
      cost: 111000,
      sale: 26,
      publishingdate: "2022-10-09",
    });
    this.books.push({
      id: 2,
      title: "Sách số 2",
      author: "Nguyễn Nhật Ánh",
      category: "Văn học thiếu nhi",
      cost: 111000,
      sale: 26,
      publishingdate: "2022-10-09",
    });
    this.books.push({
      id: 3,
      title: "Sách số 3",
      author: "Nguyễn Nhật Ánh",
      category: "Văn học thiếu nhi",
      cost: 111000,
      sale: 26,
      publishingdate: "2022-10-09",
    });
  },
  mounted(): void {
    this.$eventBus.$on("onAddNewBook", this.addNewBook);
    this.$eventBus.$on("onUpdateBook", this.handleUpdateBook);
  },
  beforeDestroy(): void {
    this.$eventBus.$off("onAddNewBook", this.addNewBook);
    this.$eventBus.$off("onUpdateBook", this.handleUpdateBook);
  },
});
</script>

<style lang="scss" scoped>
.book {
  &-list {
    padding-top: 20px;
    display: flex;
    gap: 25px;
    flex-wrap: wrap;
    margin: 10px;
  }

  &-item {
    cursor: pointer;
  }
}
.btn {
  &-group {
    display: flex;
    justify-content: center;
    gap: 10px;
  }
}
</style>
