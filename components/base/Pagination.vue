<template>
  <div class="pagination">
    <IconButton
      size="sm"
      name="material-symbols:arrow-left"
      @click="changePage(currentPage - 1)"
      :disabled="currentPage === 1"
    />
    <span class="mx-2">{{ currentPage }} / {{ totalPages }}</span>
    <IconButton
      size="sm"
      name="material-symbols:arrow-right"
      @click="changePage(currentPage + 1)"
      :disabled="currentPage === totalPages"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["pageChange"]);

function changePage(newPage) {
  if (newPage >= 1 && newPage <= props.totalPages) {
    emit("pageChange", newPage);
  }
}
</script>

<style lang="postcss">
.pagination {
  @apply m-auto flex justify-center items-center cursor-pointer;
}
</style>