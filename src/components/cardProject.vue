<template>
  <optional-link :href="project.url">
    <article class="card-project vstack g-1">
      <header v-if="project.image">
        <picture class="ratio-wide">
          <responsive-image :src="project.image"></responsive-image>
        </picture>
      </header>

      <section class="vstack g-half">
        <h2 v-if="project.title">
          {{ project.title }}
        </h2>

        <vue-markdown v-if="project.description" :source="project.description">
        </vue-markdown>

        <div class="hstack g-half" v-if="project.tags">
          <template v-for="tag in project.tags">
            <span class="tag">{{ tag }}</span>
          </template>
        </div>
      </section>
    </article>
  </optional-link>
</template>

<script setup>
import ResponsiveImage from "@/components/ResponsiveImage.vue";
import OptionalLink from "@/components/optionalLink.vue";
import VueMarkdown from "vue-markdown-render";
defineProps({
  project: Object,
});
</script>

<style lang="scss" scoped></style>
