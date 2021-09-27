<template>
  <v-row justify="center" align="center">
    <v-col cols="12" id="content">
      <Movies :movies="MOVIES"/>
    </v-col>
  </v-row>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      MOVIES: 'movies/MOVIES'
    })
  },
  methods: {
    ...mapActions({
      GET_MOVIES_FROM_API: 'movies/GET_MOVIES_FROM_API'
    })
  },
  mounted() {
    this.GET_MOVIES_FROM_API()
  }
}
</script>
