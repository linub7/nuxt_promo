import Vue from 'vue';

export const state = () => ({
    items: {
        all: [],
        featured: []
    },
    item: {},
    pagination: {
        count: 0, // Count of all of our published blogs
        pageCount: 0, // how many pages we want to display
        pageSize: 3, // how many items we want to display per page
        pageNum: 1, // current page
    }
});

export const actions = {
    // /api/v1/blogs?pageNum=3&pageSize=2
    fetchBlogs({ commit, state }, filter) {
        const url = this.$applyParamsToUrl('/api/v1/blogs', filter);
        return this.$axios.$get(url)
            .then(data => {
                const { blogs, count, pageCount } = data;
                commit('setBlogs', { resource: 'all', blogs });
                commit('setPagination', { count, pageCount })
                return state.items.all;
            })
            .catch(e => Promise.reject(e));
    },
    // /api/v1/blogs?filter[featured]=true
    fetchFeaturedBlogs({ commit, state }, filter) {
        const url = this.$applyParamsToUrl('/api/v1/blogs', filter);
        return this.$axios.$get(url)
                        .then(data => {
                            const { blogs } = data;
                            commit('setBlogs', { resource: 'featured', blogs });
                            return state.items.featured;
                        })
                        .catch(e => Promise.reject(e));
    },
    fetchBlogBySlug({ commit, state }, slug) {
        return this.$axios.$get(`/api/v1/blogs/s/${slug}`)
            .then(blog => {
                commit('setBlog', blog);
                return state.item;
            })
            .catch(e => Promise.reject(e));
    }
};

export const mutations = {
    setBlogs(state, { resource, blogs }) {
        state.items[resource] = blogs;
    },
    setBlog(state, blog) {
        state.item = blog;
    },
    setPage(state, currentPage) {
        Vue.set(state.pagination, 'pageNum', currentPage);
    },
    setPagination(state, { count, pageCount }) {
        Vue.set(state.pagination, 'count', count);
        Vue.set(state.pagination, 'pageCount', pageCount);
    }
};