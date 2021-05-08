
export const state = () => ({
    user: null
})

export const getters = {
    authUser(state) {
        return state.user || null;
    },

    isAuthenticated(state) {
        return !!state.user;
    },

    isAdmin(state) {
        return state.user &&
                state.user.role &&
                state.user.role === 'admin';
    }
}

export const actions = {
    login({ commit, state }, loginData) {
        return this.$axios.$post('/api/v1/users/login', loginData)
            .then((user) => {
                commit('setAuthUser', user);
                return state.user;
            })
            .catch((error) => Promise.reject(error));
    },
    logout({ commit }) {
        return this.$axios.$post('/api/v1/users/logout')
                .then(() => {
                    commit('setAuthUser', null);
                    return true;
                })
                .catch((error) => Promise.reject(error));
    },
    register(context, registerData) {
        return this.$axios.$post('/api/v1/users/register', registerData)
                .catch((error) => {
                    let errorMessage = 'OOOOPS, something went wrong, please try again';
                    if(error.response.data.errors) {
                        errorMessage = error.response.data.errors.message
                    }
                    return Promise.reject(errorMessage);
                });
    },

    getAuthUser({ commit, getters, state }) {
        const authUser = getters.authUser;

        if(authUser) { return Promise.resolve(authUser) }

        return this.$axios.$get('/api/v1/users/me')
                .then((user) => {
                    console.log(user)
                    commit('setAuthUser', user);
                    return state.user;
                })
                .catch((error) => {
                    console.log(error);
                    commit('setAuthUser', null);
                    return Promise.reject(error);
                })
    }
}

export const mutations = {
    setAuthUser(state, user) {
        state.user = user
    }
}