<template>
  <v-card class="movie px-3 py-6">
    <h2 class="text-center mb-3">{{ movie.name }}</h2>
    <div class="movie__img" :style="{backgroundImage: `url('${movie.image}')`}">
    </div>
  </v-card>
</template>

<script>

export default {
  props: {
    movie: {
      type: Object,
      default: {},
      required: false
    }
  },
  data: () => {
    return {}
  },

}

</script>

<style lang="scss">
.movie {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;

  &__img {
    line-height: 0;
    width: 250px;
    max-width: 75%;
    padding-top: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 4px;
  }
}
</style>
