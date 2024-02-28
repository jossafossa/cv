<template>
  <template v-for="source in sources">
    <img
      :data-srcset="source.srcset"
      :type="source.format"
      data-sizes="auto"
      :alt="props.src"
      class="lazy lazyload"
    />
  </template>
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
