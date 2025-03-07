<template>
  <div>
    <div class="flex">
      <SvgoBin
        class="icon -ml-1 md:ml-0 mr-4"
        alt="delete"
        loading="lazy"
        @click="removeItem"
      />
      <SvgoMinus
        :class="item.quantity < 2 ? 'invisible' : 'icon mr-2'"
        alt="-"
        loading="lazy"
        @click="item.quantity--"
      />
      <SvgoPlus
        :class="
          item.product.stock >= 0 && item.quantity >= item.product.stock
            ? 'invisible'
            : 'icon mr-3'
        "
        alt="+"
        loading="lazy"
        @click="item.quantity++"
      />
      <div>
        <p class="mx-1">
          {{ item.quantity }}
        </p>
      </div>
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