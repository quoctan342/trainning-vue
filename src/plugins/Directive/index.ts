import Vue from "vue";

Vue.directive("focus", {
  inserted: function (el) {
    el.focus();
  },
});

Vue.directive("invalid", function (el, binding) {
  if (!binding.value) {
    el.style.borderColor = "red";
    el.style.outline = "red";
  } else {
    el.style.borderColor = "#000";
    el.style.outline = "#000";
  }
});
