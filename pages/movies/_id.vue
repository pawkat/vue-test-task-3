<template>
  <v-row justify="center" align="center">
    <v-progress-circular
        v-if="isLoading"
        indeterminate
        color="primary"
    ></v-progress-circular>
    <v-col cols="12" id="content" v-if="movie.id">
      <div class="text-center mb-2">
        <h2 class="mb-3" v-html="movie.name"></h2>
        <h3 class="mb-3">{{ getGenre() }}</h3>
        <img :src="movie.image" :alt="movie.name"/>
      </div>
      <div class="text-center mb-5">
        <v-btn
            elevation="4"
            @click="toggleSessions"
            class="mx-2"
            color="primary"
        >See Sessions
        </v-btn>
      </div>
      <div v-html="movie.description"></div>
      <div v-html="movie.additional"></div>

      <v-dialog
          v-model="showSessions"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition">
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn
                icon
                dark
                @click="showSessions = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>{{ movie.name }}</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <div class="center-loader" v-if="!sessions.length">
            <v-progress-circular
                indeterminate
                color="primary"
            ></v-progress-circular>
          </div>
          <div class="px-3 pb-6 pt-13" v-else>
            <sessions
                v-for="(daySessions, i) in sessions" :key="i"
                :daySessions="daySessions"
                :movie="movie"
                :classList="i + 1 < sessions.length ? 'mb-5' : ''"
            />
          </div>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  data() {
    return {
      movie: {},
      showSessions: false,
      sessions: {},
      isLoading: false
    }
  },
  computed: {
    ...mapGetters({
      GENRES: 'movies/GENRES',
    }),
  },
  methods: {
    ...mapActions({
      GET_MOVIE_FROM_API: 'movies/GET_MOVIE_FROM_API',
      GET_SESSIONS_FROM_API: 'movies/GET_SESSIONS_FROM_API',
    }),
    getGenre: function () {
      let genre = this.GENRES.filter(genre => genre.id === this.movie.genre).shift()
      if (genre) {
        return genre.label
      }
      return ''
    },
    toggleSessions: function () {
      this.showSessions = !this.showSessions
      if (!this.sessions.length) {
        this.getSessions()
      }
    },
    getSessions: function () {
      this.GET_SESSIONS_FROM_API(this.movie.id)
          .then(sessions => this.sessions = sessions)
    }
  },
  mounted: function () {
    this.GET_MOVIE_FROM_API(this.$route.params.id)
        .then(movie => {
          this.movie = movie
          this.isLoading = false
        })
        .catch(error => this.isLoading = false)
  },
}
</script>

<style lang="scss">
.age_icon {
  background-image: none !important;
}
</style>
