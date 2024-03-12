<template>
  <optional-link :href="project.url" target="blank">
    <article class="card-project vstack g-1 has-effect">
      <header v-if="project.image">
        <picture class="ratio-wide">
          <responsive-image :src="project.image"></responsive-image>
        </picture>

        <div class="card-links hstack gap-1" v-if="project.images">
          <image-lightbox :images="project?.images">
            <button class="button">View images</button>
          </image-lightbox>
        </div>
      </header>

      <section class="vstack g-half">
        <h2 v-if="project.title">
          {{ project.title }}
        </h2>

        <p v-if="project.description">{{ project.description }}</p>
      </section>

      <footer>
        <div class="hstack g-half" v-if="project.tags">
          <template v-for="tag in project.tags">
            <span class="tag" :style="{ '--accent': getColor(tag) }">{{
              tag
            }}</span>
          </template>
        </div>
      </footer>
    </article>
  </optional-link>
</template>

<script setup>
import ResponsiveImage from "@/components/ResponsiveImage.vue";
import OptionalLink from "@/components/optionalLink.vue";
import ImageLightbox from "@/components/ImagegLightbox.vue";
import { getColor } from "@/assets/utils.js";
defineProps({
  project: Object,
});
</script>

<style lang="scss" scoped>
.card-project {
  border-radius: 1.5rem;
  padding: 1rem;
}
header {
  position: relative;
  border-radius: 0.5rem;
  overflow: hidden;

  > .card-links {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 1rem;
  }
}

section {
  flex: 1;
}

footer {
  padding-bottom: 1rem;
}
</style>
