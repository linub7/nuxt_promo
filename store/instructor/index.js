

export const state = () => ({
    heroes: []
});


export const actions = {
    fetchHeroes({ commit, state }) {
        return this.$axios.$get('/api/v1/product-heroes')
            .then(heroes => {
                commit('setHeroes', heroes);
                return state.heroes;
            })
            .catch(e => Promise.reject(e));
    },
    activateHero({ commit }, heroID) {
        return this.$axios.$patch(`/api/v1/product-heroes/${heroID}`)
            .then(activeHero => {
                commit('hero/setHero', activeHero, { root: true });
                return activeHero;
            })
            .catch(e => Promise.reject(e));
    }
}

export const mutations = {
    setHeroes(state, heroes) {
        state.heroes = heroes;
    }
}

