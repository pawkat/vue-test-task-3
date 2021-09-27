export const state = () => ({
    movies: [],
})

export const mutations = {
    SET_MOVIES_TO_STATE(state, movies) {
        state.movies = movies
    }
}

export const actions = {
    GET_MOVIES_FROM_API({commit, dispatch}) {
        const url = 'https://cinema-api-test.y-media.io/v1/movies'
        return this.$axios.$get(url)
            .then((response) => {
                if (response.error_code === 0 && Array.isArray(response.data) && response.data.length) {
                    commit('SET_MOVIES_TO_STATE', response.data)
                }
                return response
            })
            .catch((error) => {
                console.log(error)
                return error
            })
    },
}

export const getters = {
    MOVIES(state) {
        return state.movies
    },
}
