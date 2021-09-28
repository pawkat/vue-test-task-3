<template>
  <v-row>
    <v-col cols="12">
      <h1 class="text-center">Movies</h1>
      <h2 class="text-center">Search the movies</h2>
      <v-text-field
          label="Search the movies"
          placeholder="Enter movie name"
          type="search"
          v-model="query"
          append-icon="mdi-close"
          @click:append="clearInput"
      ></v-text-field>
      <div class="text-center">
        <v-btn
            v-for="(data, id) in GENRES"
            :key="id"
            class="mx-2 my-2"
            @click="toggleGenre(id)"
            :color="id === ACTIVE_GENRE ? 'primary' : ''"
        >
          {{ data.label }}
        </v-btn>
      </div>
    </v-col>
    <v-col
        v-for="movie in MOVIES"
        :key="movie.id"
        cols="12"
        sm="6"
    >
      <movie :movie="movie" :genres="GENRES"/>
    </v-col>
    <v-col
        v-if="!MOVIES.length && (ACTIVE_GENRE || SEARCH_QUERY)"
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
      activeGenres: [],
      query: '',
      debounceTimeout: null,
    }
  },
  computed: {
    ...mapGetters({
      MOVIES: 'movies/MOVIES',
      GENRES: 'movies/GENRES',
      ACTIVE_GENRE: 'movies/ACTIVE_GENRE',
      SEARCH_QUERY: 'movies/SEARCH_QUERY',
    })
  },
  methods: {
    ...mapActions({
      GET_MOVIES_FROM_API: 'movies/GET_MOVIES_FROM_API',
      TOGGLE_GENRE: 'movies/TOGGLE_GENRE',
      UPDATE_SEARCH_QUERY: 'movies/UPDATE_SEARCH_QUERY'
    }),
    clearInput() {
      this.query = ''
    },
    toggleGenre(id) {
      this.TOGGLE_GENRE(id)
    },
    getGenreColor(id) {
      return this.activeGenres.indexOf(id) !== -1 ? 'primary' : ''
    }
  },
  mounted: function () {
    this.GET_MOVIES_FROM_API()
    this.query = this.SEARCH_QUERY
  },
  watch: {
    query: function (val) {
      if (this.debounceTimeout) clearTimeout(this.debounceTimeout);
      this.debounceTimeout = setTimeout(() => {
        this.UPDATE_SEARCH_QUERY(val)
      }, 500);
    },
  }
}

</script>

<style>

</style>
