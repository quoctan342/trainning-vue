<template>
  <div class="book">
    <div class="book-thumbnail">
      <img
        class="book-img"
        src="https://salt.tikicdn.com/cache/w444/ts/product/a2/57/b6/cac2e0ac6f4395d400d29f1aba941d68.jpg"
        alt=""
      />
    </div>
    <div class="book-info">
      <div class="book-title">{{ item.title }}</div>
      <div class="book-author">{{ item.author }}</div>
      <div class="book-cost">
        {{ formatCost }} <span class="book-sale">{{ formatSale }}</span>
      </div>
      <span class="date">{{ formatDate }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { Book } from "@/types/index";
import moment from "moment";

export default Vue.extend({
  name: "vue-book",
  props: {
    item: {
      type: Object as PropType<Book>,
      default: function () {
        return {
          id: 0,
          title: "",
          author: "",
          category: "",
          cost: 0,
          sale: 0,
          publishingdate: "",
        } as Book;
      },
    },
  },
  computed: {
    formatCost(): string {
      let result: string = this.item.cost?.toLocaleString("en-US", {
        style: "currency",
        currency: "VND",
      });
      return typeof this.item.cost === "number" ? result : "";
    },
    formatSale(): string {
      return this.item.sale === 0 || typeof this.item.sale !== "number"
        ? ""
        : "-" + this.item.sale + "%";
    },
    formatDate(): string {
      return moment(this.item.publishingdate).startOf("hour").fromNow();
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
.date {
  font-size: 12px;
}
</style>
