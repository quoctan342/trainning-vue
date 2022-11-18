import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import ModalAddBook from "../components/modal-add-book-vuex.vue";
import flushPromises from "flush-promises";
import Vuelidate from "vuelidate";
import { BookState, FormBook } from "@/types";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Vuelidate);

const mutations = {
  ADD_BOOK: jest.fn(),
};
const state: BookState = {
  books: [],
};
const store = new Vuex.Store({
  modules: {
    book: {
      state,
      mutations,
      namespaced: true,
    },
  },
});

describe("Test modal add book", () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(ModalAddBook, {
      store,
      localVue,
    });

    jest.resetAllMocks();
  });

  it("Test props", async () => {
    await wrapper.setProps({
      value: true,
    });

    expect(wrapper.vm.value).toBe(true);
  });

  it("Test data and v-model", async () => {
    const exampleBook: FormBook = {
      title: "Sách giáo khoa lớp 1",
      author: "Nguyễn Văn A",
      category: "Văn học thiếu nhi",
      cost: 100000,
      sale: 10,
      publishingdate: "2022-02-10",
    };
    await wrapper.setData(exampleBook);

    await flushPromises();

    const listInput = await wrapper.findAll("input");
    const selectInput = await wrapper.find("select");

    expect(listInput.at(0).element.value).toBe("Sách giáo khoa lớp 1");
    expect(listInput.at(1).element.value).toBe("Nguyễn Văn A");
    expect(selectInput.element.value).toBe("Văn học thiếu nhi");
    expect(listInput.at(2).element.value).toBe("100000");
    expect(listInput.at(3).element.value).toBe("10");
    expect(listInput.at(4).element.value).toBe("2022-02-10");
  });

  it("Test methods handleAddBook and test call mutations ADD_BOOK when form have value", async () => {
    const spy = jest.spyOn(wrapper.vm, "handleAddBook");
    await wrapper.findAll("input").at(0).setValue("Sách giáo khoa lớp 1");
    await wrapper.findAll("input").at(1).setValue("Nguyễn Văn A");
    await wrapper.find("select").setValue("Sách giáo khoa");
    await wrapper.findAll("input").at(2).setValue(100000);
    await wrapper.findAll("input").at(3).setValue(10);
    await wrapper.findAll("input").at(4).setValue("2022-02-20");

    await flushPromises();

    await wrapper.find("#btn-add-book").trigger("click");

    await flushPromises();

    expect(wrapper.vm.handleAddBook).toHaveBeenCalled();
    expect(mutations.ADD_BOOK).toHaveBeenCalled();
  });

  it("Test methods handleAddBook and test call mutations ADD_BOOK when form is empty", async () => {
    const spy = jest.spyOn(wrapper.vm, "handleAddBook");

    await wrapper.find("#btn-add-book").trigger("click");

    await flushPromises();

    expect(wrapper.vm.handleAddBook).not.toHaveBeenCalled();
    expect(mutations.ADD_BOOK).not.toHaveBeenCalled();
  });
});
