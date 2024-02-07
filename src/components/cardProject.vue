<template>
    <optional-link :href="project.url">
        <article class="card-project">
            <header v-if="project.image">

                <picture>
                    <responsive-image :src="project.image"></responsive-image>
                </picture>
            </header>

            <section>
                <h2 v-if="project.title">
                    {{ project.title }}
                </h2>
                <p v-if="project.description">
                    {{ project.description }}
                </p>
                <div class="hstack gap-half" v-if="project.tags">
                    <template v-for="tag in project.tags">
                        <span class="tag">{{ tag }}</span>
                    </template>
                </div>
            </section>

        </article>
    </optional-link>
</template>

<script setup>
import ResponsiveImage from '@/components/ResponsiveImage.vue'
import OptionalLink from '@/components/optionalLink.vue'
defineProps({
    project: Object,
})
</script>