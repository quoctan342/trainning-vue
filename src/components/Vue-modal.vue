<template>
    <div class="vue-modal" :class="{ 'is-active': toggle }" @click.self="disableModal">
        <div class="vue-modal-wrap">
            <div class="vue-modal-header">{{ title }}</div>
            <div class="vue-modal-body">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'vue-book',
    props: {
        value: {
            type: Boolean,
        },
        title: {
            type: String,
        },
    },
    computed: {
        toggle: {
            get(): boolean {
                return this.value;
            },
            set(value: boolean) {
                this.$emit('input', value);
            },
        },
    },
    methods: {
        disableModal(): void {
            this.toggle = false;
        },
    },
});
</script>

<style lang="scss" scoped>
.vue-modal {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 999;
    background: rgba(0, 0, 0, 0.8);
    transition: all 0.3s ease;
    opacity: 0;
    visibility: hidden;
    text-align: center;
    overflow: hidden auto;

    &:before {
        display: inline-block;
        width: 0;
        height: 100%;
        vertical-align: middle;
        content: '';
    }
    &.is-active {
        opacity: 1;
        visibility: visible;
    }
    &-wrap {
        max-height: calc(100% - 40px);
        top: 0;
        display: inline-flex;
        flex-direction: column;
        vertical-align: middle;
        width: 400px;
        background: #fff;
        text-align: left;
        border-radius: 5px;
        padding: 0;
        overflow: hidden;
    }
    &-header {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 10px;
        background-color: #6495ed;
        font-weight: 700;
        text-align: center;
        padding: 5px;
        color: #fff;
    }
    &-body {
        min-height: 20px;
        overflow: hidden;
        padding: 10px;
    }
    &-footer {
        border-top: 1px solid #ccc;
    }
    &-close {
        position: absolute;
        top: 24px;
        right: 22px;
        z-index: 1;
        cursor: pointer;
        opacity: 0.9;
        &:hover {
            opacity: 1;
        }
    }
}
</style>
