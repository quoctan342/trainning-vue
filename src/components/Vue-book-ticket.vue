<template>
    <div class="book">
        <div class="book-thumbnail">
            <img class="book-img" :src="item.img" alt="" />
        </div>
        <div class="book-info">
            <div class="book-title">{{ item.title }}</div>
            <div class="book-author">{{ item.author }}</div>
            <div class="book-cost">
                {{ formatCost }} <span class="book-sale">{{ formatSale }}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { Book } from '@/types/index';

export default Vue.extend({
    name: 'vue-book',
    props: {
        item: {
            type: Object as PropType<Book>,
        },
    },
    computed: {
        formatCost(): string {
            return this.item.cost.toLocaleString('en-US', {
                style: 'currency',
                currency: 'VND',
            });
        },
        formatSale(): string {
            return this.item.sale === 0 ? '' : '-' + this.item.sale + '%';
        },
    },
});
</script>

<style lang="scss" scoped>
.book {
    border: 1px solid #000;
    border-radius: 3px;
    max-width: 200px;
    width: 100%;

    &-thumbnail {
        height: 250px;
        padding: 5px;
    }

    &-img {
        max-width: 190px;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
    }

    &-info {
        padding: 5px;
        border-top: 1px solid #000;
        word-wrap: break-word;
        text-align: left;
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    &-author {
        font-size: 13px;
    }

    &-cost {
        font-weight: bold;
    }

    &-sale {
        font-size: 10px;
        font-weight: 600;
        vertical-align: top;
    }
}
</style>
