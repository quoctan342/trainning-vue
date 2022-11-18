import Vue from "vue";
import { mount, createLocalVue, Wrapper } from "@vue/test-utils";
import modalUpdateBook from "../components/modal-update-book.vue";
import Vuelidate from "vuelidate";
import { Book } from "@/types";
import flushPromises from "flush-promises";

const localVue = createLocalVue();
localVue.use(Vuelidate);
localVue.prototype.$eventBus = new Vue();

describe("Test component update", () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(modalUpdateBook, {
      localVue,
    });
  });

  it("Test props", async () => {
    const exampleBook: Book = {
      id: 1,
      title: "Sách giáo khoa lớp 1",
      author: "Nguyễn Văn A",
      category: "Văn học thiếu nhi",
      cost: 100000,
      sale: 10,
      publishingdate: "2022-02-20",
    };

    await wrapper.setProps({
      value: true,
    });

    await flushPromises();

    await wrapper.setProps({
      book: exampleBook,
    });

    await flushPromises();

    expect(wrapper.vm.value).toBe(true);

    const listInput = wrapper.findAll("input");
    const selectInput = wrapper.find("select");

    expect(listInput.at(0).element.value).toBe("Sách giáo khoa lớp 1");
    expect(listInput.at(1).element.value).toBe("Nguyễn Văn A");
    expect(selectInput.element.value).toBe("Văn học thiếu nhi");
    expect(listInput.at(2).element.value).toBe("100000");
    expect(listInput.at(3).element.value).toBe("10");
    expect(listInput.at(4).element.value).toBe("2022-02-20");
  });

  it("Test data and v-model", async () => {
    await wrapper.setData({
      title: "Sách văn học thiếu nhi 1",
      author: "Lê Văn A",
      category: "Văn học thiếu nhi",
      cost: 200000,
      sale: 50,
      publishingdate: "2022-03-10",
    });

    const listInput = wrapper.findAll("input");
    const selectInput = wrapper.find("select");

    expect(listInput.at(0).element.value).toBe("Sách văn học thiếu nhi 1");
    expect(listInput.at(1).element.value).toBe("Lê Văn A");
    expect(selectInput.element.value).toBe("Văn học thiếu nhi");
    expect(listInput.at(2).element.value).toBe("200000");
    expect(listInput.at(3).element.value).toBe("50");
    expect(listInput.at(4).element.value).toBe("2022-03-10");
  });

  describe("Test methods handle update book", () => {
    it("- Form have value", async () => {
      const spy = jest.spyOn(wrapper.vm, "handleUpdateBook");

      const listInput = wrapper.findAll("input");
      const selectInput = wrapper.find("select");

      // set value for form update book
      await listInput.at(0).setValue("Sách văn học thiếu nhi 1");
      await listInput.at(1).setValue("Lê Văn A");
      await selectInput.setValue("Văn học thiếu nhi");
      await listInput.at(2).setValue(200000);
      await listInput.at(3).setValue(50);
      await listInput.at(4).setValue("2022-03-10");

      // await
      await flushPromises();

      //trigger click button update book
      await wrapper.find("button").trigger("click");

      await flushPromises();

      expect(wrapper.vm.handleUpdateBook).toHaveBeenCalled();
    });

    it("- Form is empty", async () => {
      const spy = jest.spyOn(wrapper.vm, "handleUpdateBook");

      //trigger click button update book
      await wrapper.find("button").trigger("click");

      await flushPromises();

      expect(wrapper.vm.handleUpdateBook).not.toHaveBeenCalled();
    });
  });

  describe("Test methods reset form", () => {
    it("Test methods when Modal is disable (toggle = false)", async () => {
      const spy = jest.spyOn(wrapper.vm, "resetForm");

      expect(wrapper.vm.resetForm).not.toHaveBeenCalled();
    });
    it("Test methods when Modal is enable (toggle = true)", async () => {
      const spy = jest.spyOn(wrapper.vm, "resetForm");

      await wrapper.setProps({
        value: true,
      });

      expect(wrapper.vm.resetForm).toHaveBeenCalled();
    });
  });
});
