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
                        <input type="text" id="Cost" v-model="$v.cost.$model" />
                        <div class="error" v-if="$v.cost.$error && !$v.cost.required">Field is required!</div>
                        <div class="error" v-if="$v.cost.$error && !$v.cost.numeric">Must be number!</div>
                    </div>
                </div>
                <div class="input-group">
                    <label class="left" for="Sale">Sale</label>
                    <div class="right">
                        <input type="text" id="Sale" v-model="$v.sale.$model" />
                        <div class="error" v-if="$v.sale.$error && !$v.sale.numeric">Must be number!</div>
                    </div>
                </div>
            </div>
            <button @click="handleAddBook" class="btn btn-primary">Add</button>
        </vue-modal>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import VueModal from '@/components/Vue-modal.vue';
import { required, numeric } from 'vuelidate/lib/validators';

export default Vue.extend({
    name: 'modal-add-book',
    components: {
        'vue-modal': VueModal,
    },
    props: {
        value: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            title: '' as string,
            author: '' as string,
            category: 'Sách giáo khoa' as string,
            cost: 0 as string,
            sale: 0 as number,
        };
    },
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
        validationGroup: ['title', 'author', 'cost', 'sale'],
    },
    computed: {
        toggle: {
            get(): boolean {
                return this.value;
            },
            set(value: boolean): void {
                this.$emit('input', value);
            },
        },
    },
    methods: {
        handleAddBook(): void {
            this.$v.$touch();
            if (this.$v.$invalid) {
                this.submitStatus = 'ERROR';
            } else {
                this.submitStatus = 'OK';
                this.$eventBus.$emit('onAddNewBook', {
                    title: this.title,
                    author: this.author,
                    category: this.category,
                    cost: this.cost,
                    sale: this.sale,
                    img: 'https://salt.tikicdn.com/cache/w444/ts/product/a2/57/b6/cac2e0ac6f4395d400d29f1aba941d68.jpg',
                });
                this.toggle = !this.toggle;
            }
        },
    },
});
</script>

<style lang="scss" scoped>
.form {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.btn {
    margin-top: 10px;
}
</style>
