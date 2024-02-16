<template>
  <template v-for="source in sources">
    <source
      :srcset="source.srcset"
      :type="source.format"
      data-sizes="auto"
      class="lazyload"
    />
  </template>
  <img :src="ogImage" :alt="src" data-sizes="auto" class="lazyload" />
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getSources } from "@/assets/utils.js";

let ogImage = ref("");

const props = defineProps({
  src: String,
  alt: String,
});

const sources = ref("");

onMounted(async () => {
  ogImage.value = `/img/${props.src}`;
  sources.value = await getSources(props.src);
});
</script>
