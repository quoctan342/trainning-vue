<template>
    <div class="pokemon">
        <h1>Pokemons Page</h1>
        <div class="search">
            <input type="text" v-model.trim="$v.search_name.$model" placeholder="Search Pokemon by name" />
            <button
                @click="SearchByName"
                class="btn btn-primary"
                :disabled="!$v.search_name.required || !$v.search_name.isUnique"
            >
                Search
            </button>
        </div>
        <div class="error" v-if="$v.search_name.$error && !$v.search_name.isUnique">Pokemon' is not available.</div>

        <div v-if="is_loading" class="loader"></div>
        <div v-else class="pokemon-list">
            <div class="pokemon-info" v-for="(pokemon, index) in pokemons_show" :key="index">
                <img :src="pokemon.img" class="pokemon-img" :alt="pokemon.name" />
                {{ pokemon.name.toUpperCase() }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import PokemonAPI from '@/api/pokemon';
import { required } from 'vuelidate/lib/validators';

interface Pokemon {
    name: string;
    url: string;
    img: string;
}

export default Vue.extend({
    name: 'Pokemons-page',
    data: () => ({
        pokemons: [] as Pokemon[],
        pokemons_show: [] as Pokemon[],
        is_loading: false as boolean,
        search_name: '' as string,
    }),
    validations: {
        search_name: {
            async isUnique(value: string) {
                if (value === '') return true;
                const result = await PokemonAPI.getOneByName(value);
                return Boolean(result);
            },
        },
    },
    watch: {
        search_name() {
            this.resetForm();
        },
    },
    methods: {
        async resetForm() {
            this.is_loading = true;
            await new Promise((r) => setTimeout(r, 1000));
            if (this.search_name === '') {
                this.pokemons_show = await this.pokemons;
            }
            this.is_loading = false;
        },
        async SearchByName() {
            this.is_loading = true;
            try {
                const result = await PokemonAPI.getOneByName(this.search_name);
                this.pokemons_show = [
                    {
                        name: result.name,
                        url: '',
                        img: result.sprites?.other?.['official-artwork']?.front_default,
                    },
                ];
                this.is_loading = false;
            } catch (error) {
                console.log(error);
                this.is_loading = false;
            }
        },
    },
    async mounted() {
        this.is_loading = true;
        try {
            const pokemons = await PokemonAPI.getAll();

            for (let pokemon of pokemons.results) {
                const poke = await PokemonAPI.getOne(pokemon.url);
                this.pokemons.push({
                    name: pokemon.name,
                    url: pokemon.url,
                    img: poke.sprites?.other?.['official-artwork']?.front_default,
                });
            }
        } catch (error) {
            console.error(error);
        }
        this.pokemons_show = this.pokemons;
        this.is_loading = false;
    },
});
</script>

<style lang="scss" scoped>
.search {
    display: flex;
    gap: 10px;
}
.pokemon {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;

    &-list {
        display: flex;
        gap: 20px;
        flex-wrap: wrap;
        justify-content: center;
    }

    &-info {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    &-img {
        max-width: 200px;
        width: 100%;
    }
}
</style>
