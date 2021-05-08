import Vue from 'vue';


function seperateBlogs(blogs) {
    const published = [];
    const drafts = [];

    blogs.forEach(blog => {
        blog.status === 'active' ? drafts.push(blog) : published.push(blog);
    });

    return { published, drafts };
}


export const state = () => ({
    items: {
        drafts: [],
        published: []
    },
    item: {},
    isSaving: false,
});

export const actions = {
    createBlog(_, blogData) {
        return this.$axios.$post('/api/v1/blogs', blogData)
                    .then(blog => blog)
                    .catch( error => Promise.reject(error));
    },
    fetchBlogById({commit}, blogId) {
        return this.$axios.$get(`/api/v1/blogs/${blogId}`)
            .then(blog => commit('setBlog', blog))
    },
    fetchUserBlogs({ commit, state }) {
        return this.$axios.$get('/api/v1/blogs/me')
                    .then((blogs) => {
                        const { published, drafts } = seperateBlogs(blogs);
                        commit('setBlogs', { resource: 'drafts', items: drafts });
                        commit('setBlogs', { resource: 'published', items: published });

                        return { published, drafts };
                    })
    },
    deleteBlog({ commit, state }, blog) {
        const resource = blog.status === 'active' ? 'drafts' : 'published';
        return this.$axios.$delete(`/api/v1/blogs/${blog._id}`)
                    .then(_ => {
                        const index = state.items[resource].findIndex((b) => b.id === blog._id);
                        commit('deleteBlog', { resource, index });
                        return true;
                    })
                    .catch(e => Promise.reject(e));
    },
    updateBlog({ commit, state }, { data, id}) {
        commit('setIsSaving', true);
        return this.$axios.$patch(`/api/v1/blogs/${id}`, data)
                    .then((blog) => {
                        commit('setBlog', blog);
                        commit('setIsSaving', false);
                        return state.item;
                    })
                    .catch((e) => {
                        commit('setIsSaving', false);
                        return Promise.reject(e);
                    });
    },
    updatePublishedBlog({ commit, state }, { data, id}) {
        return this.$axios.$patch(`/api/v1/blogs/${id}`, data)
                .then(blog => {
                    const index = state.items['published'].findIndex(b => b._id === id);
                    commit('setPublishedBlog', { index, blog });
                    return blog;
                })
                .catch(e => Promise.reject(e));
    }
};

export const mutations = {
    setBlog(state, blog) {
        state.item = blog
    },
    setPublishedBlog(state, { index, blog }) {
        Vue.set(state.items.published, index, blog);
    },
    deleteBlog(state, { resource, index }) {
        state.items[resource].splice(index, 1);
    },
    setBlogs(state, { resource, items }) {
        state.items[resource] = items
    },
    setIsSaving(state, isSaving) {
        state.isSaving = isSaving;
    }
};

