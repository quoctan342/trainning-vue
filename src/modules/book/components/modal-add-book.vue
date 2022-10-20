<template>
  <div>
    <vue-modal v-model="toggle" title="Add new book">
      <ValidationObserver v-slot="{ invalid }" ref="form">
        <div class="form">
          <ValidationProvider
            name="Title"
            rules="required"
            v-slot="{ errors, classes }"
          >
            <div class="input-group">
              <label class="left" for="Title">Title:</label>
              <div class="right" :class="classes">
                <input
                  type="text"
                  v-invalid="errors.length === 0"
                  v-model.trim="title"
                />
                <div class="message">{{ errors[0] }}</div>
              </div>
            </div>
          </ValidationProvider>
          <ValidationProvider
            name="Author"
            rules="required"
            v-slot="{ errors, classes }"
          >
            <div class="input-group">
              <label class="left" for="Author">Author:</label>
              <div class="right" :class="classes">
                <input
                  type="text"
                  v-invalid="errors.length === 0"
                  v-model.trim="author"
                />
                <div class="message">{{ errors[0] }}</div>
              </div>
            </div>
          </ValidationProvider>
          <div class="input-group">
            <label class="left" for="Category">Category:</label>
            <div class="right">
              <select class="input-select" v-model="category" id="Category">
                <option value="Sách giáo khoa">Sách giáo khoa</option>
                <option value="Văn học thiếu nhi">Văn học thiếu nhi</option>
                <option value="Khoa học">Khoa học</option>
              </select>
            </div>
          </div>
          <ValidationProvider
            name="Cost"
            rules="required|numeric"
            v-slot="{ errors, classes }"
          >
            <div class="input-group">
              <label class="left" for="Cost">Cost:</label>
              <div class="right" :class="classes">
                <input
                  type="text"
                  v-invalid="errors.length === 0"
                  v-model.number="cost"
                />
                <div class="message">{{ errors[0] }}</div>
              </div>
            </div>
          </ValidationProvider>
          <ValidationProvider
            name="Sale"
            rules="numeric|max_value:100"
            v-slot="{ errors, classes }"
          >
            <div class="input-group">
              <label class="left" for="Sale">Sale:</label>
              <div class="right" :class="classes">
                <input
                  type="text"
                  v-invalid="errors.length === 0"
                  v-model.number="sale"
                />
                <div class="message">{{ errors[0] }}</div>
              </div>
            </div>
          </ValidationProvider>
          <div class="input-group">
            <label class="left" for="Publishing Date">Publishing Date</label>
            <div class="right">
              <v-menu
                ref="menu"
                :close-on-content-click="false"
                :return-value.sync="publishingdate"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <ValidationProvider
                    name="Publishing Date"
                    rules="required|validate_date"
                    v-slot="{ errors, classes }"
                  >
                    <div :class="classes">
                      <input
                        type="text"
                        v-invalid="errors.length === 0"
                        v-model="publishingdate"
                        id="PublishDate"
                        v-bind="attrs"
                        v-on="on"
                      />
                      <div class="message">{{ errors[0] }}</div>
                    </div>
                  </ValidationProvider>
                </template>
                <v-date-picker v-model="publishingdate" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false">
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.menu.save(publishingdate)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </div>
          </div>
        </div>

        <button
          @click="handleAddBook"
          :disabled="invalid"
          class="btn btn-primary"
        >
          Add
        </button>
      </ValidationObserver>
    </vue-modal>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Book } from "@/types";
import VueModal from "@/components/Vue-modal.vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";

export default Vue.extend({
  name: "modal-add-book",
  components: {
    VueModal,
    ValidationProvider,
    ValidationObserver,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    currentLastID: {
      type: Number,
    },
  },
  data: () => ({
    title: "" as string,
    author: "" as string,
    category: "Sách giáo khoa" as string,
    cost: "" as string,
    sale: "" as number,
    publishingdate: "" as string,
  }),
  computed: {
    toggle: {
      get(): boolean {
        if (this.value === true) {
          this.resetForm();
        }
        return this.value;
      },
      set(value: boolean): void {
        this.$emit("input", value);
      },
    },
  },
  methods: {
    resetForm(): void {
      //reset form
      this.title = "";
      this.author = "";
      this.category = "Sách giáo khoa";
      this.cost = "";
      this.sale = "";
      this.publishingdate = "";
    },
    handleAddBook(): void {
      this.$eventBus.$emit("onAddNewBook", {
        id: this.currentLastID + 1,
        title: this.title,
        author: this.author,
        category: this.category,
        cost: this.cost,
        sale: this.sale == "" ? 0 : this.sale,
        publishingdate: this.publishingdate,
      });

      this.$nextTick(() => {
        this.$refs.form.reset();
      });
      this.toggle = !this.toggle;
    },
  },
});
</script>

<style lang="scss" scoped>
.books {
  padding-top: 20px;
  display: flex;
  gap: 25px;
  flex-wrap: wrap;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;
}

select {
  border: 1px solid #000;
  padding: 0px 10px;
  border-radius: 5px;
}

input {
  border: 1px solid #000;
  border-radius: 5px;
}
</style>
