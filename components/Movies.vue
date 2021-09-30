<template>
  <v-row>
    <v-col cols="12">
      <h2 class="text-center">Search the movies</h2>
      <v-text-field
          label="Search the movies"
          placeholder="Enter movie name"
          type="search"
          v-model="search"
          append-icon="mdi-close"
          @click:append="clearInput"
      ></v-text-field>
      <div class="text-center">
        <v-btn
            v-for="genre in GENRES"
            :key="genre.id"
            class="mx-2 my-2"
            @click="toggleGenre(genre.id)"
            :color="genre.active ? 'primary' : ''"
        >
          {{ genre.label }}
        </v-btn>
      </div>
    </v-col>
    <v-col
        v-for="movie in filteredMovies"
        :key="movie.id"
        cols="12"
        sm="6"
    >
      <movie :movie="movie" :genres="GENRES"/>
    </v-col>
    <v-col
        v-if="!filteredMovies.length && (activeGenres.length || search)"
        cols="12"
    >
      <h2>There isn't movies, try another search</h2>
    </v-col>
  </v-row>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  data() {
    return {
      search: '',
    }
  },
  computed: {
    ...mapGetters({
      MOVIES: 'movies/MOVIES',
      GENRES: 'movies/GENRES',
    }),
    filteredMovies() {
      if (!this.search.length && !this.activeGenres.length) {
        return this.MOVIES
      }
      return this.MOVIES.filter(movie => {
        let validated = true;
        if (this.search && !movie.name.toLowerCase().includes(this.search.toLowerCase())) {
          validated = false
        }
        if (this.activeGenres.length && !this.activeGenres.includes(movie.genre)){
          validated = false
        }

        return validated
      })
    },
    activeGenres() {
      return this.GENRES.filter(genre => genre.active).map(genre => genre.id)
    }
  },
  methods: {
    ...mapActions({
      GET_MOVIES_FROM_API: 'movies/GET_MOVIES_FROM_API',
      TOGGLE_GENRE: 'movies/TOGGLE_GENRE',
    }),
    clearInput() {
      this.search = ''
    },
    toggleGenre(id) {
      this.TOGGLE_GENRE(id)
    },
  },
  mounted: function () {
    this.GET_MOVIES_FROM_API()
  },
}

</script>

<style>

</style>
