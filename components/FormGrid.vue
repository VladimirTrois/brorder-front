<template>
    <fieldset class="formGrid">
        <div class="md:col-span-2">
            <FormItems />
        </div>
        <div class="md:col-span-3">
            <FormProducts />
        </div>
    </fieldset>
</template>

<style lang="postcss">
.formGrid {
    @apply grid md:grid-cols-5 gap-2;
}
</style>