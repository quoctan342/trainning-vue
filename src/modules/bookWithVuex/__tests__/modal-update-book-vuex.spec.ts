import { mount, createLocalVue } from "@vue/test-utils";
import Vuelidate from "vuelidate";
import modalUpdateBookVuex from "../components/modal-update-book-vuex.vue";
import { Book, BookState, FormBook } from "@/types";
import flushPromises from "flush-promises";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuelidate);
localVue.use(Vuex);

const mutations = {
  UPDATE_BOOK: jest.fn(),
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

describe("Test component modal update book with Vuex", () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(modalUpdateBookVuex, {
      localVue,
      store,
    });

    jest.resetAllMocks();
  });

  it("Test props", async () => {
    await wrapper.setProps({
      value: true,
    });

    expect(wrapper.vm.value).toBe(true);

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
      book: exampleBook,
    });

    const listInput = await wrapper.findAll("input");
    const selectInput = await wrapper.find("select");

    expect(listInput.at(0).element.value).toBe("Sách giáo khoa lớp 1");
    expect(listInput.at(1).element.value).toBe("Nguyễn Văn A");
    expect(selectInput.element.value).toBe("Văn học thiếu nhi");
    expect(listInput.at(2).element.value).toBe("100000");
    expect(listInput.at(3).element.value).toBe("10");
    expect(listInput.at(4).element.value).toBe("2022-02-20");
  });

  it("Test data and v-model", async () => {
    const exampleBook: FormBook = {
      title: "Sách giáo khoa lớp 1",
      author: "Nguyễn Văn A",
      category: "Văn học thiếu nhi",
      cost: 100000,
      sale: 10,
      publishingdate: "2022-02-20",
    };

    await wrapper.setData({
      ...exampleBook,
    });

    const listInput = await wrapper.findAll("input");
    const selectInput = await wrapper.find("select");

    expect(listInput.at(0).element.value).toBe("Sách giáo khoa lớp 1");
    expect(listInput.at(1).element.value).toBe("Nguyễn Văn A");
    expect(selectInput.element.value).toBe("Văn học thiếu nhi");
    expect(listInput.at(2).element.value).toBe("100000");
    expect(listInput.at(3).element.value).toBe("10");
    expect(listInput.at(4).element.value).toBe("2022-02-20");
  });

  it("Test methods handle update book and test mutation UPDATE_BOOK (when handle update book fired) when form have value", async () => {
    const spy = jest.spyOn(wrapper.vm, "handleUpdateBook");

    const listInput = wrapper.findAll("input");
    const selectInput = wrapper.find("select");

    await listInput.at(0).setValue("Sách giáo khoa lớp 1");
    await listInput.at(1).setValue("Nguyễn Văn A");
    await selectInput.setValue("Văn học thiếu nhi");
    await listInput.at(2).setValue(100000);
    await listInput.at(3).setValue(10);
    await listInput.at(4).setValue("2022-02-20");

    await flushPromises();

    await wrapper.find("button").trigger("click");

    await flushPromises();

    expect(wrapper.vm.handleUpdateBook).toHaveBeenCalled();
    expect(mutations.UPDATE_BOOK).toHaveBeenCalled();
  });

  it("Test methods handle update book and test mutation UPDATE_BOOK (when handle update book fired) when form is empty", async () => {
    const spy = jest.spyOn(wrapper.vm, "handleUpdateBook");

    await wrapper.find("button").trigger("click");

    await flushPromises();

    expect(wrapper.vm.handleUpdateBook).not.toHaveBeenCalled();
    expect(mutations.UPDATE_BOOK).not.toHaveBeenCalled();
  });
});
