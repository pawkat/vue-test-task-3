<template>
  <div class="places py-4 px-4">
    <div class="center-loader" v-if="!places.length">
      <v-progress-circular
          indeterminate
          color="primary"
      ></v-progress-circular>
    </div>
    <div v-else
         class="places__content">
      <div class="places__row">
        <div class="places__col">Row</div>
        <div class="places__col places__col_full">Place</div>
      </div>
      <div
          v-for="row in places"
          :key="row[0].row"
          class="places__row"
      >
        <div class="places__col">{{ row[0].row }}</div>
        <div
            v-for="col in row[1]"
            :key="col.seat"
            class="places__col"
            :class="col.is_free ? 'is-active' : ''"
        >
          <v-btn
              fab
              x-small
              :color="col.is_free ? 'primary' : ''"
              :disabled="!col.is_free"
              @click="bookPlace(row[0].row, col.seat)"
          >
            {{ col.seat }}
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    places: {
      type: Array,
      default: function () {
        return []
      },
      required: true
    },
    movie: {
      type: Object,
      default: function () {
        return {}
      },
      required: true
    },
    selectedDaytime: {
      type: String,
      default: '',
      required: true
    },
    showdate: {
      type: String,
      default: '',
      required: true
    },
  },
  data() {
    return {}
  },
  methods: {
    bookPlace(row, seat) {
      this.$axios.$post('/api/bookPlace', {
        "movie_id": this.movie.id,
        "row": row,
        "seat": seat,
        "showdate": this.showdate,
        "daytime": this.selectedDaytime
      })
          .then((response) => {
            if (response.error_code === 0 && response.data && response.data.ticketkey) {
              alert(`Success, your ticket key: ${response.data.ticketkey}`)
              this.$emit('place-booked', response.data)
            }
          })
          .catch((error) => {
            alert(error)
          })
    }
  }
}

</script>

<style lang="scss">
.places {
  position: relative;
  overflow-x: auto;
  $self: &;

  &__content {
    width: fit-content;
    margin: 0 auto;
  }

  &__row {
    display: flex;
    padding: 2px 0;
  }

  &__col {
    width: 34px;
    display: flex;
    align-items: center;
    justify-content: center;

    &_full {
      flex-grow: 1;
    }
  }
}
</style>


<style lang="scss">
.center-loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
