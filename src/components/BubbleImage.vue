<template>
  <picture ref="image">
    <template v-for="image of sources">
      <responsive-image :src="image" alt="Joost Hobma" />
    </template>
  </picture>
</template>

<script setup>
import ResponsiveImage from "@/components/ResponsiveImage.vue";
import BubbleImage from "@/assets/js/BubbleImage.js";
import { ref, defineProps, onMounted } from "vue";

const image = ref(null);

let props = defineProps({
  sources: Object,
});
onMounted(() => {
  window.requestAnimationFrame(() => {
    new BubbleImage(image.value);
  });
});
</script>

<style lang="scss" scoped></style>
