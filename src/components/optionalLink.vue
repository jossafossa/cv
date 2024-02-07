<template>
    <a v-if="href" :href="href">
        <slot></slot>
    </a>

    <template v-else>
        <slot></slot>
    </template>
</template>

<script setup>
defineProps({
    href: String,
})

</script>