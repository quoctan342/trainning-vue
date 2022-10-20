import Vue from "vue";

Vue.directive("focus", {
  // Khi phần tử liên quan được thêm vào DOM...
  inserted: function (el) {
    // Ta gán focus vào phần tử đó
    el.focus();
  },
});
