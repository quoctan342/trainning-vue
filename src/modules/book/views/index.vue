<template>
    <div>
        <button @click="toggleModalAddBook" class="btn btn-primary">Add new book (using Vuelidate)</button>
        <modal-add-book v-model="modalAddBook"></modal-add-book>
        <div class="books">
            <vue-book v-for="(book, index) in books" :key="index" :item="book"></vue-book>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ModalAddBook from '../components/Modal-add-book.vue';
import { Book } from '@/types';
import VueBookTicket from '@/components/Vue-book-ticket.vue';

export default Vue.extend({
    name: 'Book-page',
    components: {
        ModalAddBook,
        'vue-book': VueBookTicket,
    },
    data() {
        return {
            books: [] as Book[],
            modalAddBook: false as boolean,
        };
    },
    methods: {
        toggleModalAddBook(): void {
            this.modalAddBook = !this.modalAddBook;
        },
        addNewBook(payload: Book): void {
            this.books.push(payload);
        },
    },
    created() {
        this.books.push({
            title: 'Sách số 1',
            author: 'Nguyễn Nhật Ánh',
            category: 'Văn học thiếu nhi',
            cost: 111000,
            sale: 26,
            img: 'https://salt.tikicdn.com/cache/w444/ts/product/a2/57/b6/cac2e0ac6f4395d400d29f1aba941d68.jpg',
        });
        this.books.push({
            title: 'Sách số 2',
            author: 'Nguyễn Nhật Ánh',
            category: 'Văn học thiếu nhi',
            cost: 111000,
            sale: 26,
            img: 'https://salt.tikicdn.com/cache/w444/ts/product/a2/57/b6/cac2e0ac6f4395d400d29f1aba941d68.jpg',
        });
        this.books.push({
            title: 'Sách số 3',
            author: 'Nguyễn Nhật Ánh',
            category: 'Văn học thiếu nhi',
            cost: 111000,
            sale: 26,
            img: 'https://salt.tikicdn.com/cache/w444/ts/product/a2/57/b6/cac2e0ac6f4395d400d29f1aba941d68.jpg',
        });
        this.$eventBus.$on('onAddNewBook', this.addNewBook);
    },
    beforeDestroy() {
        this.$eventBus.$off('onAddNewBook', this.addNewBook);
    },
});
</script>

<style lang="scss" scoped>
.books {
    padding-top: 20px;
    display: flex;
    gap: 25px;
    flex-wrap: wrap;
}
</style>
