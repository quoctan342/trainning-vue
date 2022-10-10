<template>
    <div>
        <button @click="toggleModalAddBook" class="btn btn-primary">Add new book (using Vuelidate)</button>
        <modal-new-book v-model="modalAddBook"></modal-new-book>
        <div class="books">
            <vue-book v-for="(book, index) in books" :key="index" :item="book"></vue-book>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ModalNewBook from '@/modules/book/components/modal-new-book.vue';
import { Book } from '@/types';
import VueBookTicket from '@/components/Vue-book-ticket.vue';
import { required, numeric } from 'vuelidate/lib/validators';

export default Vue.extend({
    name: 'Book-page',
    components: {
        ModalNewBook,
        'vue-book': VueBookTicket,
    },
    data(): any {
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
    created(): void {
        this.books.push({
            title: 'sas',
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
    },
    mounted(): void {
        this.$eventBus.$on('onAddNewBook', this.addNewBook);
    },
    beforeDestroy(): void {
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
