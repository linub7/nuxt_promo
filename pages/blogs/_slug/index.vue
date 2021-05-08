
<template>
    <div class="blog-editor-container">
        <div class="container">
            <div class="blog-section-user">
                <UserTile :name="blog.author.name" :avatar="blog.author.avatar" :date="blog.createdAt | formatDate" />
            </div>
            <EditorView :initialContent="blog.content" />
        </div>
    </div>
</template>

<script>
import UserTile from '~/components/shared/UserTile.vue';
import EditorView from '~/components/editor/EditorView.vue'
export default {
    head() {
        return {
            title: this.blog.title,
            meta: [
                { hid: 'description', name: 'description', content: this.blog.subtitle }
            ]
        }
    },
    components: {
        UserTile,
        EditorView
    },
    computed: {
        blog() {
            return this.$store.state.blog.item;
        }
    },
    async fetch({ store, params }) {
        await store.dispatch('blog/fetchBlogBySlug', params.slug);
    }
}
</script>

<style lang="scss" scoped>
.blog-content, .blog-section-user {
    max-width: 800px;
    margin: 10px auto;
}

</style>