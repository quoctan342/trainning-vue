import { createLocalVue, mount } from "@vue/test-utils";
import Joke from "../views/index.vue";
import flushPromises from "flush-promises";
import axios from "@/api/apiClient";
import Vuelidate from "vuelidate";
import "@/plugins/Directive";

const mockJokeList = { id: "HeaFdiyIJe", joke: "Joke abc", status: 200 };

jest.mock("axios", () => {
  const mAxiosInstance = {
    get: jest.fn(() => Promise.resolve(mockJokeList)),
    interceptors: {
      request: { use: jest.fn(), eject: jest.fn() },
      response: { use: jest.fn(), eject: jest.fn() },
    },
  };
  return {
    create: jest.fn(() => mAxiosInstance),
  };
});

const localVue = createLocalVue();
localVue.use(Vuelidate);

describe("Test component Joke", () => {
  let wrapper: any;
  beforeEach(() => {
    wrapper = mount(Joke, {
      localVue,
    });
  });
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });
  it("Test call api get a joke", async () => {
    await wrapper.find("#get-a-joke").trigger("click");
    await flushPromises();

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith("", {});

    const result = wrapper.findAll("[data-test=joke]");
    expect(result.at(0).text()).toBe("Joke abc (id: HeaFdiyIJe)");
  });
  it("Test call api get multi joke", async () => {
    await wrapper.find("#get-multi-joke").trigger("click");
    await flushPromises();

    expect(axios.get).toHaveBeenCalledTimes(3);
    expect(axios.get).toHaveBeenCalledWith("", {});

    const result = wrapper.findAll("[data-test=joke]");
    expect(result.at(0).text()).toBe("Joke abc (id: HeaFdiyIJe)");
    expect(result.at(1).text()).toBe("Joke abc (id: HeaFdiyIJe)");
    expect(result.at(2).text()).toBe("Joke abc (id: HeaFdiyIJe)");
  });
  it("Test call api search joke by id", async () => {
    await wrapper.findAll("input").at(0).setValue("HeaFdiyIJe");
    await flushPromises();

    await wrapper.find("#search-joke-id").trigger("click");
    await flushPromises();

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith("j/HeaFdiyIJe", {});

    const result = wrapper.find(".result");
    expect(result.text()).toContain("HeaFdiyIJe");
  });
  it("Test call api search joke by id", async () => {
    await wrapper.findAll("input").at(0).setValue("Joke abc");
    await flushPromises();

    await wrapper.find("#search-joke-words").trigger("click");
    await flushPromises();

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith("search", {
      params: {
        page: 1,
        limit: 30,
        term: "Joke abc",
      },
    });
  });
});
