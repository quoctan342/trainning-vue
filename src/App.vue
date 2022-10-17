<template>
    <v-app
        ><v-progress-linear v-show="is_loading" indeterminate color="green"></v-progress-linear>
        <nav>
            <router-link to="/">Home</router-link> |
            <router-link to="/article">Article (Example Nested Router)</router-link> |
            <router-link to="/book">Book not with Vuex </router-link> |
            <router-link to="/joke">Joke (Example API with Axios)</router-link> |
            <router-link to="/bookwithvuex">Book with Vuex</router-link>
        </nav>
        <v-main>
            <router-view />
        </v-main>
    </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';

export default Vue.extend({
    name: 'App',

    data: () => ({
        //
    }),
    computed: {
        ...mapState(['is_loading']),
    },
});
</script>
<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

nav {
    padding: 30px;
}

nav a {
    font-weight: bold;
    color: #2c3e50;
}

nav a.router-link-exact-active {
    color: #42b983;
}
</style>
