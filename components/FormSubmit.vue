<template>
    <button class="buttonSubmit" @click="click" type="submit">{{text}}</button>
</template>

<script setup>
defineProps({
    text: String
})
</script>

<style lang="postcss">
.buttonSubmit{
    @apply bg-gray-300 p-1 px-5 rounded-md border-transparent border-2;
    &:hover{
        @apply border-primary border-2;
    }
}
</style>