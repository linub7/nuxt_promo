<template>
    <div class="editor course-editor">
        <CourseMenu :editor="editor" />
        <editor-content class="editor__content" :editor="editor" />
    </div>
</template>

<script>
import { Editor, EditorContent } from 'tiptap';
import CourseMenu from '~/components/editor/CourseMenu.vue';

import { 
    Bold,
    Italic,
    History,
    OrderedList,
    BulletList,
    ListItem,
    } from 'tiptap-extensions';

export default {
    components: {
        EditorContent,
        CourseMenu,
    },
    data() {
        return {
            editor: null
        }
    },
    props: {
        initialContent: {
            type: String,
            required: true,
        }
    },
    // this run only in client(in browser)
    mounted() {
        this.editor = new Editor({
            extensions: [
                new Bold(),
                new Italic(),
                new History(),
                new OrderedList(),
                new BulletList(),
                new ListItem(),
            ],
            onUpdate: () => {
                this.emitUpdate();
            }
        })

        this.initialContent && this.editor.setContent(this.initialContent);
    },
    beforeDestroy() {
    this.editor && this.editor.destroy()
    },
    methods: {
        emitUpdate() {
            const content = this.editor.getHTML();
            this.$emit('editorUpdated', content);
        }
    },
}
</script>

<style lang="scss">
.course-editor {
    * {
        &:focus {
            outline: none;
        }
    }
    border: 1px solid grey;


    .editor__content {
        padding: 0 20px 20px 20px;
    }
}

</style>
