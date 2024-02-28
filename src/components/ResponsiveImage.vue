<template>
  <template v-for="source in sources">
    <source
      :data-srcset="source.srcset"
      :type="source.format"
      data-sizes="auto"
      class="lazy lazyload"
    />
  </template>
  <img :src="ogImage" :alt="src" class="lazy lazyload" />
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
  let sourcesArr = await getSources(props.src);
  sources.value = sourcesArr;
  console.log(sourcesArr);

  // last source is the original image
  ogImage.value = sourcesArr[0].images[0];
});
</script>
