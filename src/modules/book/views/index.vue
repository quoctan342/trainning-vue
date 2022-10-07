<template>
    <div>
        <button @click="toggleModalAddBook" class="btn btn-primary">Add new book (using Vuelidate)</button>
        <modal-add-book v-model="modalAddBook"></modal-add-book>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ModalAddBook from '../components/Modal-add-book.vue';
import { Book } from '@/types';

export default Vue.extend({
    name: 'Book-page',
    components: {
        ModalAddBook,
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
    },
    created() {
        this.books.push({
            author: 'Nguyễn Nhật Ánh',
            category: 'Văn học thiếu nhi',
            cost: 111000,
            sale: 26,
            img: 'https://salt.tikicdn.com/cache/w444/ts/product/a2/57/b6/cac2e0ac6f4395d400d29f1aba941d68.jpg',
        });
    },
});
</script>

<style lang="scss" scoped></style>
