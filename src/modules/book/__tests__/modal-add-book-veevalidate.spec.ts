import Vue from "vue";
import { createLocalVue, mount, Wrapper } from "@vue/test-utils";
import ModalAddBookVeevalidate from "../components/modal-add-book-veevalidate.vue";
import { Book } from "@/types";
import Vuetify from "vuetify";
import flushPromises from "flush-promises";
import "@/plugins/Veevalidate/CustomRules";

const localVue = createLocalVue();
localVue.prototype.$eventBus = new Vue();
localVue.use(Vuetify);

describe("Test component Modal Add Book with Veevalidate", () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(ModalAddBookVeevalidate, {
      localVue,
      attachToDocument: true,
    });
  });

  it("Test props", async () => {
    await wrapper.setProps({
      value: true,
      currentLastID: 1,
    });

    expect(wrapper.vm.value).toBe(true);
    expect(wrapper.vm.currentLastID).toBe(1);
  });
  it("Test data and 2 way binding", async () => {
    await wrapper.findAll("input").at(0).setValue("Sách giáo khoa lớp 1");
    await wrapper.findAll("input").at(1).setValue("Nguyễn Văn A");
    await wrapper.find("select").setValue("Văn học thiếu nhi");
    await wrapper.findAll("input").at(2).setValue(100000);
    await wrapper.findAll("input").at(3).setValue(10);
    await wrapper.findAll("input").at(4).setValue("2022-02-20");

    expect(wrapper.vm.title).toBe("Sách giáo khoa lớp 1");
    expect(wrapper.vm.author).toBe("Nguyễn Văn A");
    expect(wrapper.vm.category).toBe("Văn học thiếu nhi");
    expect(wrapper.vm.cost).toBe(100000);
    expect(wrapper.vm.sale).toBe(10);
    expect(wrapper.vm.publishingdate).toBe("2022-02-20");
  });
  describe("Test methods", () => {
    it("Testing handle add book form when user click add book", async () => {
      const spyHandleAddBook = jest.spyOn(wrapper.vm, "handleAddBook");

      const listInput = wrapper.findAll("input");
      listInput.at(0).setValue("Sách giáo khoa lớp 1");
      listInput.at(1).setValue("Nguyễn Văn A");
      wrapper.find("select").setValue("Văn học thiếu nhi");
      listInput.at(2).setValue(100000);
      listInput.at(3).setValue(10);
      listInput.at(4).setValue("2022-02-20");

      await flushPromises();

      await wrapper.find("button").trigger("click");

      await flushPromises();
      expect(wrapper.vm.handleAddBook).toBeCalled();
    });
    it("Testing handle add book when user click add book with form empty", async () => {
      const spyHandleAddBook = jest.spyOn(wrapper.vm, "handleAddBook");

      const listInput = wrapper.findAll("input");
      await listInput.at(0).setValue("");
      await listInput.at(1).setValue("");
      await listInput.at(2).setValue("");
      await listInput.at(3).setValue("");
      await listInput.at(4).setValue("");

      await flushPromises();

      await wrapper.find("button").trigger("click");

      await flushPromises();

      expect(wrapper.vm.handleAddBook).toHaveBeenCalledTimes(0);
    });
  });
});
