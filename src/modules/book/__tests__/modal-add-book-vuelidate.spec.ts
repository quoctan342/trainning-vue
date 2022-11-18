import Vue from "vue";
import { mount, createLocalVue } from "@vue/test-utils";
import Vuelidate from "vuelidate";
import ModalAddBookVuelidate from "../components/modal-add-book-vuelidate.vue";
import "@/plugins/Directive";
import flushPromises from "flush-promises";

const localVue = createLocalVue();
localVue.use(Vuelidate);
localVue.prototype.$eventBus = new Vue();

describe("Test component modal add book with Vuelidate", () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(ModalAddBookVuelidate, {
      localVue,
    });
  });

  it("Test props", async () => {
    await wrapper.setProps({
      value: true,
      currentLastID: 3,
    });

    expect(wrapper.vm.value).toBe(true);
    expect(wrapper.vm.currentLastID).toBe(3);
  });

  it("Test data and v-model (set value input => data)", async () => {
    const listInput = wrapper.findAll("input");
    const selectInput = wrapper.find("select");
    await listInput.at(0).setValue("Sách giáo khoa lớp 1");
    await listInput.at(1).setValue("Nguyễn Văn A");
    await selectInput.setValue("Văn học thiếu nhi");
    await listInput.at(2).setValue(100000);
    await listInput.at(3).setValue(10);
    await listInput.at(4).setValue("2022-02-20");

    expect(wrapper.vm.title).toBe("Sách giáo khoa lớp 1");
    expect(wrapper.vm.author).toBe("Nguyễn Văn A");
    expect(wrapper.vm.category).toBe("Văn học thiếu nhi");
    expect(wrapper.vm.cost).toBe(100000);
    expect(wrapper.vm.sale).toBe(10);
    expect(wrapper.vm.publishingdate).toBe("2022-02-20");
  });

  describe("Test methods Handle add book", () => {
    it("When form is valid", async () => {
      const listInput = wrapper.findAll("input");
      const selectInput = wrapper.find("select");

      const spy = jest.spyOn(wrapper.vm, "handleAddBook");

      //set value for form add book
      await listInput.at(0).setValue("Sách giáo khoa lớp 1");
      await listInput.at(1).setValue("Nguyễn Văn A");
      await selectInput.setValue("Văn học thiếu nhi");
      await listInput.at(2).setValue(100000);
      await listInput.at(3).setValue(10);
      await listInput.at(4).setValue("2022-02-20");

      // await validate
      await flushPromises();

      // trigger click add Book
      await wrapper.find("button").trigger("click");

      await flushPromises();

      expect(wrapper.vm.handleAddBook).toHaveBeenCalled();
    });
    it("When form is empty", async () => {
      const spy = jest.spyOn(wrapper.vm, "handleAddBook");

      // trigger click add Book
      await wrapper.find("button").trigger("click");

      expect(wrapper.vm.handleAddBook).not.toHaveBeenCalled();
    });
  });
});
