<template>
  <template v-for="source in sources">
    <source
      :srcset="source.srcset"
      :type="source.format"
      data-sizes="auto"
      class="lazyload"
    />
  </template>
  <img :srcset="ogImage" :alt="src" data-sizes="auto" />
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
