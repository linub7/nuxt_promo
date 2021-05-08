export const state = () => ({
    items: [],
    item: {},
});

export const actions = {
    fetchCourses({ commit }) {
        return this.$axios.$get('/api/v1/products')
            .then((courses) => {
                commit('setItems', { resource: 'course', items: courses }, { root: true });
                return state.items;
            })
    },
    fetchCourseBySlug({ commit, state }, courseSlug) {
        return this.$axios.$get(`/api/v1/products/s/${courseSlug}`)
            .then(course => {
                commit('setCourse', course)
            })
            .catch(e => Promise.reject(e));
    }
};

export const mutations = {
    setCourse(state, course) {
        state.item = course;
    }
};