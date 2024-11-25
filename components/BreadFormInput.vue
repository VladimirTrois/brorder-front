<template>
    <label :for="id" >
        <input 
            class="breadforminput"
            :id="id"
            require :placeHolder="placeHolder"
            type="text"
        />
    </label>
</template>

<script setup>
defineProps({
    id: String,
    placeHolder: String
})
const model = defineModel()
</script>

<style lang="postcss">
.breadforminput{
    @apply block bg-gray-100 border shadow
        text-primary text-sm mb-2
        placeholder-primary placeholder-inherit;
    &:hover {
        @apply border-secondary;
    }
    &:focus{
        @apply placeholder-opacity-50;
    }
}
</style>