<template>
    <div>
        <vue-modal v-model="toggle" title="Add new book">
            <div class="form">
                <div class="input-group">
                    <label class="left" for="Title">Title:</label>
                    <div class="right">
                        <input
                            :class="{ 'input-error': $v.title.$error }"
                            type="text"
                            id="Title"
                            v-model.trim="$v.title.$model"
                        />
                        <div class="error" v-if="$v.title.$error && !$v.title.required">Field is required!</div>
                    </div>
                </div>
                <div class="input-group">
                    <label class="left" for="Author">Author:</label>
                    <div class="right">
                        <input
                            :class="{ 'input-error': $v.author.$error }"
                            type="text"
                            id="Author"
                            v-model.trim="$v.author.$model"
                        />
                        <div class="error" v-if="$v.author.$error && !$v.author.required">Field is required!</div>
                    </div>
                </div>
                <div class="input-group">
                    <label class="left" for="Category">Category</label>
                    <div class="right">
                        <select class="input-select" v-model="category" id="Category">
                            <option value="Sách giáo khoa">Sách giáo khoa</option>
                            <option value="Văn học thiếu nhi">Văn học thiếu nhi</option>
                            <option value="Khoa học">Khoa học</option>
                        </select>
                    </div>
                </div>
                <div class="input-group">
                    <label class="left" for="Cost">Cost</label>
                    <div class="right">
                        <input type="text" id="Cost" v-model.number="$v.cost.$model" />
                        <div class="error" v-if="$v.cost.$error && !$v.cost.required">Field is required!</div>
                        <div class="error" v-if="$v.cost.$error && !$v.cost.numeric">Must be number!</div>
                    </div>
                </div>
                <div class="input-group">
                    <label class="left" for="Sale">Sale</label>
                    <div class="right">
                        <input type="text" id="Sale" v-model.number="$v.sale.$model" />
                        <div class="error" v-if="$v.sale.$error && !$v.sale.numeric">Must be number!</div>
                    </div>
                </div>
                <div class="input-group">
                    <label class="left" for="Publishing Date">Publishing Date</label>
                    <div class="right">
                        <v-menu
                            ref="menu"
                            :close-on-content-click="false"
                            :return-value.sync="$v.publishingdate.$model"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <input
                                    type="text"
                                    v-model="$v.publishingdate.$model"
                                    id="PublishDate"
                                    v-bind="attrs"
                                    v-on="on"
                                />
                            </template>
                            <v-date-picker v-model="$v.publishingdate.$model" no-title scrollable>
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
                                <v-btn text color="primary" @click="$refs.menu.save($v.publishingdate.$model)">
                                    OK
                                </v-btn>
                            </v-date-picker>
                        </v-menu>
                        <div class="error" v-if="$v.publishingdate.$error && !$v.publishingdate.required">
                            Field is required!
                        </div>
                    </div>
                </div>
            </div>
            <button @click="handleAddBook" class="btn btn-primary">Add</button>
        </vue-modal>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Book } from '@/types';
import { required, numeric } from 'vuelidate/lib/validators';
import VueModal from '@/components/Vue-modal.vue';
import { mapMutations } from 'vuex';

export default Vue.extend({
    name: 'modal-new-book-vuex',
    components: {
        VueModal,
    },
    props: {
        value: {
            type: Boolean,
            default: false,
        },
    },
    data: () => ({
        title: '' as string,
        author: '' as string,
        category: 'Sách giáo khoa' as string,
        cost: '' as string,
        sale: '' as number,
        publishingdate: '' as string,
    }),
    validations: {
        title: {
            required,
        },
        author: {
            required,
        },
        cost: {
            required,
            numeric,
        },
        sale: {
            numeric,
        },
        publishingdate: {
            required,
        },
        validationGroup: ['title', 'author', 'cost', 'sale', 'publishingdate'],
    },
    computed: {
        toggle: {
            get(): boolean {
                if (this.value === true) {
                    this.resetForm();
                }
                return this.value;
            },
            set(value: boolean): void {
                this.$emit('input', value);
            },
        },
    },
    methods: {
        ...mapMutations('book', ['ADD_BOOK']),
        resetForm(): void {
            //reset form
            this.title = '';
            this.author = '';
            this.category = 'Sách giáo khoa';
            this.cost = '';
            this.sale = '';
            this.publishingdate = '';
            this.$v.$reset();
        },
        handleAddBook(): void {
            this.$v.$touch();
            if (this.$v.$invalid) {
                this.submitStatus = 'ERROR';
            } else {
                this.submitStatus = 'OK';
                this.ADD_BOOK({
                    title: this.title,
                    author: this.author,
                    category: this.category,
                    cost: this.cost,
                    sale: this.sale == '' ? 0 : this.sale,
                    img: 'https://salt.tikicdn.com/cache/w444/ts/product/a2/57/b6/cac2e0ac6f4395d400d29f1aba941d68.jpg',
                });

                this.toggle = !this.toggle;
            }
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
