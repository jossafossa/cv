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

const props = defineProps({
  src: String,
  alt: String,
});

const sizes = [
  { width: 200, height: 200, suffix: "-200x200" },
  { width: 400, height: 400, suffix: "-400x400" },
  { width: 800, height: 800, suffix: "-800x800" },
  { width: 1500, height: 1500, suffix: "-1500x1500" },
  { width: 2000, height: 2000, suffix: "-2000x2000" },
];
let ogImage = ref("");

let formats = ["webp"];
// let formats = [];

const getSources = async (src) => {
  let [name, ext] = src.split(".");
  let sources = [];

  for (let format of [...formats, ext]) {
    let srcsets = [];
    for (let size of sizes) {
      let img = `/img/${name}${size.suffix}.${format}`;
      srcsets.push(`${img} ${size.width}w`);
    }
    sources.push({
      srcset: srcsets.join(", "),
      format: `image/${format}`,
    });
  }

  console.log(sources);
  return sources;
};

const sources = ref("");

onMounted(async () => {
  ogImage.value = `/img/${props.src}`;
  sources.value = await getSources(props.src);
});
</script>
