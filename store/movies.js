export const state = () => ({
    movies: [],
    genres: {
        '0': {
            label: 'Action',
        },
        '1': {
            label: 'Adventures',
        },
        '2': {
            label: 'Comedy',
        },
        '3': {
            label: 'Drama',
        },
        '4': {
            label: 'Horror',
        },
        '5': {
            label: 'Westerns',
        },
    },
    activeGenre: '',
    searchQuery: '',
})

export const mutations = {
    SET_MOVIES_TO_STATE(state, movies) {
        state.movies = movies
    },
    SET_ACTIVE_GENRE(state, id) {
        state.activeGenre = state.activeGenre === id ? '' : id
    },
    SET_SEARCH_QUERY(state, query) {
        state.searchQuery = query
    }
}

export const actions = {
    GET_MOVIES_FROM_API({commit, dispatch}) {
        let search = ''
        if (this.state.movies.activeGenre) {
            search += `?genres=${this.state.movies.activeGenre}`
        }
        if (this.state.movies.searchQuery) {
            search += search ? `&name=${this.state.movies.searchQuery}` : `?name=${this.state.movies.searchQuery}`
        }
        return this.$axios.$get('/api/movies' + search)
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
    TOGGLE_GENRE({commit, dispatch}, id) {
        commit('SET_ACTIVE_GENRE', id)
        dispatch('GET_MOVIES_FROM_API')
    },
    UPDATE_SEARCH_QUERY({commit, dispatch}, query) {
        commit('SET_SEARCH_QUERY', query)
        dispatch('GET_MOVIES_FROM_API')
    },
}

export const getters = {
    MOVIES(state) {
        return state.movies
    },
    GENRES(state) {
        return state.genres
    },
    ACTIVE_GENRE(state) {
        return state.activeGenre
    },
    SEARCH_QUERY(state) {
        return state.searchQuery
    },
}
