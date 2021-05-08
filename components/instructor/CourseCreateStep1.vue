<template>
    <div class="course-create-wrapper">
        <div class="course-create-headerText">
        Please choose title of your Course.
        </div>
        <h2 class="course-create-subtitle">
        No worries, you can change title later.
        </h2>
        <form @input="emitFormData" class="course-create-form">
        <div class="course-create-form-group">
            <div class="field course-create-form-field control has-icons-right">
                <TextInputWithCount 
                    v-model="form.title"
                    :v="$v.form.title"
                    :maxLength="60"
                />
                <div v-if="$v.form.title.$error" class="form-error">
                    <span v-if="!$v.form.title.required" class="help is-danger">Title is required!</span>
                </div>
            </div>
        </div>
        </form>
    </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import TextInputWithCount from '~/components/form/TextInputWithCount.vue';
export default {
    components: {
        TextInputWithCount
    },
    data() {
        return {
            form: {
                title: ''
            }
        }
    },
    validations: {
        form: {
            title: {
                required
            }
        }
    },
    computed: {
        isValid() {
            return !this.$v.$invalid;
        }
    },
    methods: {
        emitFormData() {
            this.$emit('stepUpdated', { data: this.form, isValid: this.isValid });
        }
    },
}
</script>

<style lang="scss">
.course-create {
    &-wrapper {
    margin-top: 60px;
    text-align: center;
    }
    &-headerText {
    font-weight: 500;
    line-height: 1.1;
    margin-top: 21px;
    margin-bottom: 10.5px;
    font-size: 36px;
    font-weight: 300;
    }
    &-subtitle {
    font-size: 24px;
    font-weight: 300;
    margin-top: 21px;
    margin-bottom: 10.5px;
    }
    &-form {
    margin-top: 60px;
    &-group {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    &-field {
        min-width: 552px;
    }
    }
}
    
</style>