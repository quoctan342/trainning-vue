<template>
  <div class="joke">
    <div class="section">
      <h1>Joke Page</h1>
      <p>Random joke:</p>
      <div v-if="jokes.length > 0">
        <div v-for="joke in jokes" :key="joke.id">
          {{ joke.joke }} (id: {{ joke.id }})
        </div>
      </div>
      <div class="btn-group">
        <button @click="getAJoke" class="btn btn-primary">Get a joke</button>
        <button @click="getMultiJoke(3)" class="btn btn-primary">
          Get multi joke
        </button>
      </div>
    </div>
    <div class="section">
      <p>Search joke:</p>
      <input type="text" v-model="$v.search_joke.$model" />
      <div
        class="error"
        v-if="$v.search_joke.$error && !$v.search_joke.required"
      >
        Input is required!
      </div>
      <div class="result" v-if="jokeFound.status === 200">
        {{ jokeFound.joke }} ({{ jokeFound.id }})
      </div>
      <div class="result" v-else>{{ jokeFound.message }}</div>
      <div class="result" v-if="searched && totalJokesFound > 0">
        Found {{ totalJokesFound }} jokes
      </div>
      <div class="result" v-if="searched && totalJokesFound === 0">
        No joke found
      </div>

      <div class="btn-group">
        <button @click="searchJokeByID" class="btn btn-primary">
          Search by ID
        </button>
        <button @click="searchJokeByWords" class="btn btn-primary">
          Search Joke by Words
        </button>
      </div>
    </div>
    <div>
      <p>Async Validation with Vuelidate (Validate id)</p>
      <input type="text" v-focus v-model="$v.asyncValidate.$model" />
      <div v-if="is_loading" class="text-center">
        <v-progress-circular indeterminate color="green"></v-progress-circular>
      </div>
      <div v-else>
        <div
          class="error"
          v-if="$v.asyncValidate.$error && !$v.asyncValidate.required"
        >
          Id is required!
        </div>
        <div
          class="success"
          v-if="$v.asyncValidate.required && $v.asyncValidate.isUnique"
        >
          {{ asyncValidate }} is an valid joke id
        </div>
        <div
          class="error"
          v-if="$v.asyncValidate.required && !$v.asyncValidate.isUnique"
        >
          {{ asyncValidate }} is not an valid joke id
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import JokeAPI from "@/api/jokeAPI";
import { Joke } from "@/types/index";
import { required } from "vuelidate/lib/validators";

export default Vue.extend({
  name: "Joke-page",
  data: () => ({
    jokes: [] as Joke[],
    search_joke: "" as string,
    jokeFound: {} as Joke,
    totalJokesFound: 0 as number,
    searched: false as boolean,
    asyncValidate: "" as string,
    is_loading: false as boolean,
  }),
  validations: {
    search_joke: {
      required,
    },
    asyncValidate: {
      required,
      async isUnique(value: string) {
        if (value === "") return true;

        this.is_loading = true;
        const res = await JokeAPI.getJokeByID(value);
        if (res.status === 200) {
          this.is_loading = false;
          return true;
        } else {
          this.is_loading = false;
          return false;
        }
      },
    },
  },
  methods: {
    async getAJoke() {
      try {
        const joke = await JokeAPI.getJoke();
        if (joke) {
          this.jokes.push(joke);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getMultiJoke(n: number) {
      // N is the number of joke do you want to get
      try {
        for (let i = 0; i < n; i++) {
          const joke = await JokeAPI.getJoke();
          this.jokes.push(joke);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async searchJokeByID() {
      this.$v.search_joke.$touch();
      if (this.$v.$invalid) {
        return;
      }
      try {
        const result = await JokeAPI.getJokeByID(this.search_joke);
        if (result) {
          this.jokeFound = result;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async searchJokeByWords() {
      this.$v.$reset();
      try {
        const result = await JokeAPI.getJokeByWords(this.search_joke);
        if (result) {
          this.totalJokesFound = result.results.length;
          this.searched = true;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.error,
.success {
  background: none !important;
}
.section {
  border-bottom: 1px solid #000;
  padding-bottom: 10px;
}

.btn-group {
  margin-top: 10px;
}
</style>
