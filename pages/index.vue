<template>
  <div>
    <Hero
      :title="courseHero.title"
      :subtitle="courseHero.subtitle"
      :image="courseHero.image"
      :promoLink="courseHero.product && courseHero.product.productLink"
    />
    <section class="section">
      <div class="container">
        <h1 class="title">Featured Courses</h1>
        <div class="columns is-multiline">
          <div
            v-for="course in courses"
            :key="course._id"
            class="column is-one-quarter"
          >
            <v-popover offset="16" trigger="hover" placement="right-start">
              <CourseCard :course="course" />
              <template slot="popover">
                <CourseCardTooltip
                  :title="course.title"
                  :subtitle="course.category.name"
                  :description="course.subtitle"
                  :wsls="course.wsl"
                />
              </template>
            </v-popover>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <h1 class="title">Featured Articles</h1>
        <div class="columns is-multiline">
          <div
            v-for="fblog in featuredBlogs"
            :key="fblog._id"
            class="column is-one-quarter"
          >
            <BlogCard :blog="fblog" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Hero from "~/components/shared/Hero.vue";
import CourseCard from "~/components/CourseCard.vue";
import BlogCard from "~/components/BlogCard.vue";
import CourseCardTooltip from "~/components/CourseCardTooltip.vue";
import { mapState } from "vuex";
export default {
  head: {
    title: 'Online Courses and Blogs | Mohammad Hadi'
  },
  components: {
    Hero,
    CourseCard,
    BlogCard,
    CourseCardTooltip,
  },
  computed: {
    ...mapState({
      courses: (state) => state.course.items,
      featuredBlogs: (state) => state.blog.items.featured,
      courseHero: (state) => state.hero.item,
    }),
  },
  async fetch({ store }) {
    await store.dispatch("course/fetchCourses");
    await store.dispatch("blog/fetchFeaturedBlogs", {
      "filter[featured]": true,
    });
  },
};
</script>

<style scoped lang="scss">
// card item

// card item end

// Home page
.links {
  padding-top: 15px;
}
</style>
