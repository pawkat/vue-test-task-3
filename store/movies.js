export const state = () => ({
    movies: [],
    genres: [
        {
            label: 'Action',
            active: false,
            id: 0
        },
        {
            label: 'Adventures',
            active: false,
            id: 1
        },
        {
            label: 'Comedy',
            active: false,
            id: 2
        },
        {
            label: 'Drama',
            active: false,
            id: 3
        },
        {
            label: 'Horror',
            active: false,
            id: 4
        },
        {
            label: 'Westerns',
            active: false,
            id: 5
        },
    ],
})

export const mutations = {
    SET_MOVIES_TO_STATE(state, movies) {
        state.movies = movies
    },
    SET_ACTIVE_GENRE(state, id) {
        state.genres[id].active = !state.genres[id].active
    },
}

export const actions = {
    GET_MOVIES_FROM_API({commit, dispatch}) {
        return this.$axios.$get('/api/movies')
            .then((response) => {
                if (response.error_code === 0 && Array.isArray(response.data)) {
                    commit('SET_MOVIES_TO_STATE', response.data)
                }
                return response
            })
            .catch((error) => {
                console.log(error)
                return error
            })
    },
    GET_MOVIE_FROM_API({commit, dispatch}, id) {
        return this.$axios.$get(`/api/movies/?movie_id=${id}`)
            .then((response) => {
                if (response.error_code === 0 && Array.isArray(response.data) && response.data.length === 1) {
                    return response.data.shift()
                }
                return response
            })
            .catch((error) => {
                console.log(error)
                return error
            })
    },
    GET_SESSIONS_FROM_API({commit, dispatch}, id) {
        return this.$axios.$get(`/api/movieShows?movie_id=${id}`)
            .then((response) => {
                if (response.error_code === 0 && response.data && response.data[id]) {
                    return response.data[id]
                }
            })
            .catch((error) => {
                alert(error)
            })
    },
    TOGGLE_GENRE({commit, dispatch}, id) {
        commit('SET_ACTIVE_GENRE', id)
    },
}

export const getters = {
    MOVIES(state) {
        return state.movies
    },
    GENRES(state) {
        return state.genres
    }
}
