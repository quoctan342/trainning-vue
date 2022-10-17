<template>
    <div class="book">
        <div class="section">
            <h1>Book with Vuex Page</h1>
            <modal-add-book-vuex v-model="toggleModalAddBook"></modal-add-book-vuex>
            <button @click="enableModalAddBook" class="btn btn-primary">Add new book (Vuelidate)</button>
            <div class="book-list">
                <div class="book-item" v-for="(book, index) in books" :key="index" @click="enableUpdateBook(index)">
                    <vue-book :item="book"></vue-book>
                </div>
            </div>
            <modal-update-book-vuex
                v-model="toggleModalUpdateBook"
                :book="books[`${bookSelected}`]"
            ></modal-update-book-vuex>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import BookTicket from '@/components/Vue-book-ticket.vue';
import { mapState } from 'vuex';
import ModalAddBookVuex from '@/modules/bookWithVuex/components/modal-add-book.vue';
import ModalUpdateBookVuex from '../components/modal-update-book.vue';

export default Vue.extend({
    name: 'Book-Vuex-page',
    components: {
        'vue-book': BookTicket,
        'modal-add-book-vuex': ModalAddBookVuex,
        'modal-update-book-vuex': ModalUpdateBookVuex,
    },
    data: () => ({
        toggleModalAddBook: false as boolean,
        toggleModalUpdateBook: false as boolean,
        bookSelected: 0 as number,
    }),
    computed: {
        ...mapState('book', ['books']),
    },
    methods: {
        enableModalAddBook(): void {
            this.toggleModalAddBook = true;
        },
        enableUpdateBook(index: number): void {
            this.bookSelected = index;
            this.toggleModalUpdateBook = true;
        },
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
</style>
