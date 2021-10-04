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
              :to="'movies/'+movie.id"
              class="mx-2"
              color="primary"
          >See info
          </v-btn>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script>

export default {
  props: {
    movie: {
      type: Object,
      default: function () {
        return {}
      },
      required: false
    },
    genres: {
      type: Array,
      default: function () {
        return []
      },
      required: false
    }
  },
  data: () => {
    return {
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
</style>
