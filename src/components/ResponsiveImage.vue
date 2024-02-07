<template>
    <picture>
        <img :srcset="srcset" :alt="alt">
    </picture>
</template>


<script setup>
import { onMounted, ref } from 'vue';


const props = defineProps({
    src: String,
    alt: String,
});


const getImages = async (name) => {
    const images = import.meta.glob('../assets/img/*.jpg', {
        query: {
            width: '100,200,300',
            height: '100,200,300'
        },
        eager: true,
    });

    return images[`../assets/img/${name}.jpg`]?.default;
}

// const getImagesold = async (src) => {
//     const sizes = [
//         [320, 240],
//         [640, 480],
//         [1024, 768],
//         [1600, 1200],
//         [2048, 1536],
//     ];

//     const images = sizes.map(([width, height]) => {
//         return `${src}?w=${width}&h=${height}`;
//     });

//     console.log(images);

//     // await all promises
//     // dynamic_image = (await import(`./${name}.png?blur=1`)).default;

//     let promises = images.map((src) => {
//         return new Promise(async (resolve, reject) => {
//             console.log(src);
//             let image = await import(src);
//             resolve(image.default);
//         });
//     });

//     return Promise.all(promises);
// };

const srcset = ref("");

onMounted(() => {
    srcset.value = getImages(props.src);
});


</script>