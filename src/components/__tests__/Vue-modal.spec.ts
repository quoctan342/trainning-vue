import { mount } from "@vue/test-utils";
import VueModal from "../Vue-modal.vue";

describe("Test component Vue Modal", () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(VueModal);
  });

  it("Test Props", async () => {
    await wrapper.setProps({
      value: true,
      title: "Modal add book",
    });

    expect(wrapper.vm.value).toBe(true);
    expect(wrapper.vm.title).toBe("Modal add book");
  });

  it("Test computed and disable modal", async () => {
    await wrapper.setProps({
      value: false,
    });

    expect(wrapper.classes("is-active")).toBeFalsy();
  });

  it("Test computed and enable modal", async () => {
    await wrapper.setProps({
      value: true,
    });

    expect(wrapper.classes("is-active")).toBeTruthy();
  });

  it("Test method disable modal", async () => {
    const spy = jest.spyOn(wrapper.vm, "disableModal");

    await wrapper.find(".vue-modal").trigger("click.self");

    expect(wrapper.vm.disableModal).toBeCalled();
  });
});
