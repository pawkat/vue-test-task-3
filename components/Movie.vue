<template>
  <v-card class="movie px-3 py-6">
    <div class="movie__inner text-center">
      <div class="movie__info">
        <h2 class="mb-3" v-html="movie.name"></h2>
        <h3 class="mb-3">{{ getGenre() }}</h3>
      </div>
      <div class="movie__content">
        <div class="movie__img-wrapper">
          <div class="movie__img" :style="{backgroundImage: `url('${movie.image}')`}">
          </div>
        </div>
        <div class="text-center mt-6">
          <v-btn
              elevation="4"
              @click="toggleInfo"
              class="mx-2"
              color="primary"
          >See info
          </v-btn>
          <v-btn
              elevation="4"
              @click="toggleSessions"
              class="mx-2"
              color="primary"
          >See Sessions
          </v-btn>
        </div>
      </div>
    </div>
    <v-card class="movie-hint" :class="showInfo ? 'is-active' : ''">
      <div class="movie-hint__content px-3 pb-6 pt-13">
        <div class="movie-hint__description mb-3" v-html="movie.description"></div>
        <div class="movie-hint__additional" v-html="movie.additional"></div>
      </div>
      <div class="movie-hint__close">
        <v-btn
            @click="toggleInfo"
            fab
            dark
            small
            color="primary"
        >
          <v-icon dark>
            mdi-close
          </v-icon>
        </v-btn>
      </div>
    </v-card>
    <v-card class="movie-hint" :class="showSessions ? 'is-active' : ''">
      <div class="center-loader" v-if="!sessions.length">
        <v-progress-circular
            indeterminate
            color="primary"
        ></v-progress-circular>
      </div>
      <div class="movie-hint__content px-3 pb-6 pt-13" v-else>
        <sessions
            v-for="(daySessions, i) in sessions" :key="i"
            :daySessions="daySessions"
            :movie="movie"
            :classList="i + 1 < sessions.length ? 'mb-5' : ''"
        />
      </div>
      <div class="movie-hint__close">
        <v-btn
            @click="toggleSessions"
            fab
            dark
            small
            color="primary"
        >
          <v-icon dark>
            mdi-close
          </v-icon>
        </v-btn>
      </div>
    </v-card>
  </v-card>
</template>

<script>

export default {
  props: {
    movie: {
      type: Object,
      default: {},
      required: false
    },
    genres: {
      type: Array,
      default: [],
      required: false
    }
  },
  data: () => {
    return {
      showInfo: false,
      showSessions: false,
      sessions: {}
    }
  },
  methods: {
    getGenre: function () {
      let genre = this.genres.filter(genre => genre.id === this.movie.genre).shift()
      if (genre) {
        return genre.label
      }
      return ''
    },
    toggleInfo: function () {
      this.showInfo = !this.showInfo
    },
    toggleSessions: function () {
      this.showSessions = !this.showSessions
      if (!this.sessions.length) {
        this.getSessions()
      }
    },
    getSessions: function () {
      this.$axios.$get(`/api/movieShows?movie_id=${this.movie.id}`)
          .then((response) => {
            if (response.error_code === 0 && response.data && response.data[this.movie.id]) {
              this.sessions = response.data[this.movie.id]
            }
          })
          .catch((error) => {
            this.showSessions = false
            alert(error)
          })
    }
  }
}

</script>

<style lang="scss">
.movie {
  height: 100%;
  position: relative;

  &__inner {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  &__img-wrapper {
    width: 250px;
    max-width: 75%;
  }

  &__img {
    line-height: 0;
    width: 100%;
    padding-top: 150%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 4px;
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

.movie-hint {
  opacity: 0;
  pointer-events: none;
  transition: opacity .3s ease;

  &, &__content {
    position: absolute !important;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &__content {
    overflow-y: auto;
  }

  &.is-active {
    opacity: 1;
    pointer-events: all;
  }

  &__close {
    position: absolute;
    top: 8px;
    right: 8px;
  }
}

.age_icon {
  background-image: none !important;
}

.center-loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
