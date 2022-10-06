<template>
    <div>
        <h1>Articles Page</h1>

        <router-link to="/article/create">Create New Article</router-link>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'Articles-page',
});
</script>

<style scoped></style>
