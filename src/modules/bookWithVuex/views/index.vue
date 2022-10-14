<template>
    <div class="book">
        <div class="section">
            <h1>Book with Vuex Page</h1>
            <modal-add-book-vuex v-model="toggleModalAddBook"></modal-add-book-vuex>
            <button @click="enableModalAddBook" class="btn btn-primary">Add new book (Vuelidate)</button>
            <div class="books">
                <vue-book v-for="(book, index) in books" :key="index" :item="book"></vue-book>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import BookTicket from '@/components/Vue-book-ticket.vue';
import { mapState } from 'vuex';
import ModalAddBookVuex from '@/modules/bookWithVuex/components/modal-add-book.vue';

export default Vue.extend({
    name: 'Book-Vuex-page',
    components: {
        'vue-book': BookTicket,
        'modal-add-book-vuex': ModalAddBookVuex,
    },
    data: () => ({
        toggleModalAddBook: false as boolean,
    }),
    computed: {
        ...mapState('book', ['books']),
    },
    methods: {
        enableModalAddBook(): void {
            this.toggleModalAddBook = true;
        },
    },
});
</script>

<style lang="scss" scoped>
.books {
    padding-top: 20px;
    display: flex;
    gap: 25px;
    flex-wrap: wrap;
    margin: 10px;
}
</style>
