<template>
    <fieldset class="formGrid">
        <div class="col-span-2">
            <BreadFormItems />
        </div>
        <div class="col-span-3">
            <BreadFormProducts />
        </div>
    </fieldset>
</template>

<style lang="postcss">
.formGrid {
    @apply sm:grid sm:grid-cols-5 sm:gap-2;
}
</style>