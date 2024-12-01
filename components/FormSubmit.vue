<template>
    <button class="buttonSubmit" @click="click" :form="form" type="submit">{{text}}</button>
</template>

<script setup>
defineProps({
    text: String,
    form: String,
})
</script>

<style lang="postcss">
.buttonSubmit{
    @apply bg-secondary p-1 px-5 rounded-md border-transparent border-2 text-white;
    &:hover{
        @apply border-gray-700;
    }
}
</style>