<template>
  <div>
    <SvgoBin
      class="icon iconTrash"
      alt="delete"
      loading="lazy"
      @click="item.quantity = 0"
    />
    <SvgoMinus
      class="icon iconMinus"
      alt="-"
      loading="lazy"
      @click="item.quantity--"
    />
    <SvgoPlus
      class="icon iconPlus"
      quality="80"
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
  path {
    @apply fill-black;
  }
  @apply w-6 h-6 md:w-7 md:h-7 text-lg border-2 border-transparent;
  &:hover {
    @apply border-2 border-black rounded;
    path {
      @apply fill-primary;
    }
  }
}
.iconTrash {
  @apply mr-2;
  &:hover {
  }
}
.iconMinus {
  @apply mr-0;
  &:hover {
  }
}
.iconPlus {
  @apply mr-4;
  &:hover {
  }
}
</style>