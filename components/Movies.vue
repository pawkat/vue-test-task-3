<template>
  <v-row>
    <v-col cols="12">
      <h1 class="text-center">Movies</h1>
    </v-col>
    <v-col cols="12" sm="6" v-for="movie in movies" :key="movie.id">
      <movie :movie="movie"/>
    </v-col>
  </v-row>
</template>

<script>

export default {
  props: {
    movies: {
      type: Array,
      default: [],
      required: false
    }
  },
  data: () => {
    return {}
  },

}

</script>

<style>

</style>
