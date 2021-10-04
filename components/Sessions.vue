<template>
  <div class="sessions" :class="classList">
    <h3 class="text-center">{{ daySessions.showdate }}</h3>
    <div class="sessions__content text-center">
      <v-btn
          v-for="daytime in getTimesArray"
          :key="daytime"
          class="mx-2 my-2"
          @click="showPlaces(daytime)"
      >{{ daytime }}
      </v-btn>
    </div>

    <v-dialog
        v-model="modal"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn
              icon
              dark
              @click="closeModal">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ getModalTitle() }}</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <places
            :places="places"
            :movie="movie"
            :selectedDaytime="selectedDaytime"
            :showdate="daySessions.showdate"
            v-on:place-booked="placeBooked"
        />
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

export default {
  props: {
    daySessions: {
      type: Object,
      default: function () {
        return {}
      },
      required: false
    },
    movie: {
      type: Object,
      default: function () {
        return {}
      },
      required: true
    },
    classList: {
      type: String,
      default: '',
      required: false
    }
  },
  data() {
    return {
      modal: false,
      selectedDaytime: false,
      places: [],
    }
  },
  computed: {
    getTimesArray: function () {
      return this.daySessions.daytime.split(';')
    }
  },
  methods: {
    closeModal() {
      this.modal = false
      this.places = []
      this.selectedDaytime = ''
    },
    showPlaces(daytime) {
      this.modal = true
      this.selectedDaytime = daytime
      this.$axios.$get(`/api/showPlaces?movie_id=${this.movie.id}&daytime=${daytime}&showdate=${this.daySessions.showdate}`)
          .then((response) => {
            if (response.error_code === 0 && Array.isArray(response.data) && response.data.length) {
              this.places = response.data
            }
          })
          .catch((error) => {
            console.log(error)
          })
    },
    getModalTitle() {
      return `${this.movie.name} (${this.daySessions.showdate}, ${this.selectedDaytime})`
    },
    placeBooked(data) {
      this.places[data.row - 1][1][data.seat - 1].is_free = false
    }
  }
}

</script>

<style lang="scss">

</style>
