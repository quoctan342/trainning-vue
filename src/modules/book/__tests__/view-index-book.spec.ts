import Vue from "vue";
import { createLocalVue, mount } from "@vue/test-utils";
import IndexBox from "@/modules/book/views/index.vue";
import flushPromises from "flush-promises";
import Vuelidate from "vuelidate";
import "@/plugins/Directive";
import modalAddBookVeevalidate from "../components/modal-add-book-veevalidate.vue";
import modalAddBookVuelidate from "../components/modal-add-book-vuelidate.vue";
import modalUpdateBook from "../components/modal-update-book.vue";

const localVue = createLocalVue();
localVue.prototype.$eventBus = new Vue();
localVue.use(Vuelidate);

describe("Test component view index book", () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(IndexBox, {
      localVue,
      attachToDocument: true,
    });
  });
  it("Enable modal add book with Veevalidate", async () => {
    //click button modal add book with Veevalidate
    await wrapper.find("#add-book-veevalidate").trigger("click");

    expect(
      wrapper.findComponent(modalAddBookVeevalidate).classes("is-active")
    ).toBeTruthy();
  });
  it("Enable modal add book with Vuelidate", async () => {
    //click button modal add book with Vuelidate
    await wrapper.find("#add-book-vuelidate").trigger("click");

    expect(
      wrapper.findComponent(modalAddBookVuelidate).classes("is-active")
    ).toBeTruthy();
  });
  it("Enable modal update book", async () => {
    await wrapper.findAll(".book-item").at(0).trigger("click");

    expect(
      wrapper.findComponent(modalUpdateBook).classes("is-active")
    ).toBeTruthy();
  });
});
