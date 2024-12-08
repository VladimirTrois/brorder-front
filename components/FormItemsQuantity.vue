<template>
  <div class="flex">
    <SvgoBin
      class="icon mr-2"
      alt="delete"
      loading="lazy"
      @click="item.quantity = 0"
    />
    <SvgoMinus
      class="icon mr-2"
      alt="-"
      loading="lazy"
      @click="item.quantity--"
    />
    <SvgoPlus
      class="icon mr-4"
      alt="+"
      loading="lazy"
      @click="item.quantity++"
    />
    {{ item.quantity }}
  </div>
</template>

<script setup>
defineProps({
  item: Object,
  index: Number,
});
</script>

<style lang="postcss">
.icon {
  @apply h-5 text-lg text-black border border-transparent rounded;
  &:hover {
    @apply bg-black text-gray-200;
  }
  &:active {
    @apply bg-white text-black;
  }
  &:md {
    @apply h-7 text-xl;
  }
}
</style>