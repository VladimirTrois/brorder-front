<template>
  <div>
    <div class="flex items-center w-fit">
      <IconButton
        class="mr-3"
        size="xs"
        name="solar:trash-bin-minimalistic-linear"
        @click="removeItem"
      />
      <IconButton
        :class="item.quantity < 2 ? 'invisible' : ''"
        size="xs"
        name="carbon:subtract"
        @click="item.quantity--"
      />
      <p class="text-center mx-2">{{ item.quantity }}</p>
      <IconButton
        :class="
          item.product.stock >= 0 && item.quantity >= item.product.stock
            ? 'invisible'
            : ''
        "
        size="xs"
        name="carbon:add"
        @click="item.quantity++"
      />
    </div>
    <p class="text-center text-second">
      {{
        item.product.stock >= 0 && item.quantity >= item.product.stock
          ? "Stock max"
          : null
      }}
    </p>
  </div>
</template>
  
  <script setup>
const props = defineProps({
  item: Object,
  index: Number,
});

const singleOrder = useSingleOrder();

const removeItem = () => {
  singleOrder.order.items.splice(props.index, 1);
};
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