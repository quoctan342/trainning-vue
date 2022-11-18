import Vue from "vue";
import { mount, Wrapper } from "@vue/test-utils";
import VueBookTicket from "../Vue-book-ticket.vue";
import { Book } from "@/types";

describe("Test component VueBookTicket", () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(VueBookTicket);
  });

  it("- Test props", async () => {
    //pass Props into component
    const book: Book = {
      id: 1,
      title: "Sách giáo khoa lớp 1",
      author: "Nguyễn Văn A",
      category: "Sách giáo khoa",
      cost: 100000,
      sale: 10,
      publishingdate: "2022-02-20",
    };
    await wrapper.setProps({ item: book });
    //testing props working
    expect(wrapper.vm.item.id).toBe(1);
    expect(wrapper.find(".book-title").text()).toContain(
      "Sách giáo khoa lớp 1"
    );
    expect(wrapper.find(".book-author").text()).toContain("Nguyễn Văn A");
    expect(wrapper.vm.item.category).toBe("Sách giáo khoa");
    expect(wrapper.vm.item.cost).toBe(100000);
    expect(wrapper.vm.item.sale).toBe(10);
    expect(wrapper.vm.item.publishingdate).toBe("2022-02-20");
  });

  describe("- Test computeds", () => {
    describe("+ Computed format cost", () => {
      it("Variable Cost have valid value", async () => {
        await wrapper.setProps({
          item: {
            cost: 100000,
          },
        });
        expect(wrapper.vm.formatCost).toBe("₫100,000");
      });
      it("Value Cost isn't Invalid", async () => {
        await wrapper.setProps({
          item: {
            cost: true,
          },
        });
        expect(wrapper.vm.formatCost).toBe("");
      });
      it("Variable Cost is empty", async () => {
        await wrapper.setProps({
          item: {
            cost: "",
          },
        });
        expect(wrapper.vm.formatCost).toBe("");
      });
    });
    describe("+ Computed format sale", () => {
      it("Variable Sale have valid value", async () => {
        await wrapper.setProps({
          item: {
            sale: 22,
          },
        });
        expect(wrapper.vm.formatSale).toBe("-22%");
      });
      it("Variable Sale have invalid value", async () => {
        await wrapper.setProps({
          item: {
            sale: true,
          },
        });
        expect(wrapper.vm.formatSale).toBe("");
      });
      it("Variable Sale have valid is 0", async () => {
        await wrapper.setProps({
          item: {
            sale: 0,
          },
        });
        expect(wrapper.vm.formatSale).toBe("");
      });
      it("Variable Sale is empty", async () => {
        await wrapper.setProps({
          item: {
            sale: "",
          },
        });
        expect(wrapper.vm.formatSale).toBe("");
      });
    });
  });
});
