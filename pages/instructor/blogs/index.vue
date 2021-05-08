<template>
    <div>
        <Header
        title="Manage your Blogs"
        exitLink="/"
        />
        <div class="instructor-blogs">
        <div class="container">
            <div class="section">
            <div class="header-block">
                <h2>Your Stories</h2>
                <div class="title-menu">
                <button @click="() => $router.push('/instructor/blog/editor')" class="button">Write a story</button>
                </div>
            </div>
            <div class="tabs">
                <ul>
                <li @click="activeTab = 0"><a :class="{'is-active': activeTab === 0}">Drafts</a></li>
                <li @click="activeTab = 1"><a :class="{'is-active': activeTab === 1}">Published</a></li>
                </ul>
            </div>
            <div class="blogs-container">
                <template v-if="activeTab === 0">
                    <div v-if="drafts && drafts.length > 0">
                        <div v-for="draft in drafts" :key="draft._id" class="blog-card">
                            <h2>{{ displayBlogTitle(draft) }}</h2>
                            <div class="blog-card-footer">
                                <span>
                                    Last Edited {{ draft.updatedAt | formatDate('LLLL') }}
                                </span>
                                <Dropdown 
                                    @optionChanged="handleOption($event, draft)"
                                    :items="draftsOptions" />
                            </div>
                        </div>
                    </div>
                    <div v-else class="blog-error">
                        No Drafts :(
                    </div>
                </template>
                <template v-if="activeTab === 1">
                    <div v-if="published && published.length > 0">
                        <div v-for="publish in published" :key="publish._id" :class="{featured: publish.featured}" class="blog-card">
                            <h2> {{ displayBlogTitle(publish) }} </h2>
                            <div class="blog-card-footer">
                                <span>
                                Last Edited {{ publish.updatedAt | formatDate('LLLL') }}
                                </span>
                                <Dropdown 
                                    @optionChanged="handleOption($event, publish)"
                                    :items="publishedOptions(publish.featured)" />
                            </div>
                        </div>
                    </div>
                    <div v-else class="blog-error">
                        No Published :(
                    </div>
                </template>
            </div>
            </div>
        </div>
        </div>
    </div>
</template>
<script>
import Header from '~/components/shared/Header';
import Dropdown from '~/components/shared/Dropdown.vue';
import { createPublishedOptions, createDraftsOptions, commands } from '~/pages/instructor/options.js';
import { mapState } from 'vuex';
export default {
    // 0 => drafts  ============ 1 => published
    data() {
        return {
            activeTab: 0
        }
    },
    layout: 'instructor',
    components: {
        Header,
        Dropdown
    },
    computed: {
        ...mapState({
            published: ({ instructor }) => instructor.blog.items.published,
            drafts: ({ instructor }) => instructor.blog.items.drafts
        }),
        
        draftsOptions() {
            return createDraftsOptions();
        }
    },
    async fetch({ store }) {
        await store.dispatch('instructor/blog/fetchUserBlogs');
    },
    methods: {
        handleOption(command, blog) {
            if(command === commands.EDIT_BLOG) {
                this.$router.push(`/instructor/blog/${blog._id}/edit`);
            }
            if(command === commands.DELETE_BLOG) {
                this.displayDeleteWarning(blog);
            }

            if(command === commands.TOGGLE_FEATURE) {
                this.updateBlog(blog);
            }
        },
        updateBlog(blog) {
            const featured = !blog.featured;
            const featuredStatus = featured ? 'Featured' : 'Un-Featured';
            this.$store.dispatch('instructor/blog/updatePublishedBlog', {id: blog._id, data: { featured }})
                        .then(_ => this.$toasted.success(`Blog has been ${featuredStatus}`, { duration: 2000 }));
        },
        publishedOptions(isFeatured) {
            return createPublishedOptions(isFeatured);
        },
        displayDeleteWarning(blog) {
            const isConfirm = confirm('Are you sure to delete this blog ?');
            if(isConfirm) {
                this.$store.dispatch('instructor/blog/deleteBlog', blog)
                            .then(_ => this.$toasted.success('Blog was successfully deleted', { duration: 3000 }));
            }
        },
        displayBlogTitle(blog) {
            return blog.title || blog.subtitle || 'blog without title & subtitle';
        }
    },
}
</script>

<style scoped lang="scss">
.is-active {
    border-bottom-color: #1d1c1c;
    color: #1d1c1c;
}
.blog-error {
font-size: 35px;
}
.blog-card {
border-bottom: 1px solid rgba(0, 0, 0, 0.1);
padding: 20px 0;
> h2 {
    font-size: 30px;
    font-weight: bold;
}
&-footer {
    color: rgba(0, 0, 0, 0.54);
}
&.featured {
    border-left: 8px solid #3cc314;
    padding-left: 10px;
    transition: border ease-out 0.2s;
}
}
.header-block {
display: flex;
flex-direction: row;
align-items: center;
> h2 {
    font-size: 40px;
    font-weight: bold;
}
.title-menu {
    margin-left: auto;
}
}
</style>
