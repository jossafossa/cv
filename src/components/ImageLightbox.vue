<template>
  <button v-if="images" v-on:click.prevent="openLightbox">
    <slot></slot>
  </button>

  <template v-else>
    <slot></slot>
  </template>
</template>

<script setup>
import GLightbox from "glightbox";

const props = defineProps({
  images: Array,
});

const lightbox = new GLightbox({
  loop: true,
  zoomable: true,
  draggable: true,
});

const openLightbox = () => {
  for (let image of props.images) {
    lightbox.insertSlide({
      type: "image",
      href: `/img/${image}`,
    });
  }
  lightbox.open();
};
</script>

<style>
@import "glightbox/dist/css/glightbox.css";
</style>
