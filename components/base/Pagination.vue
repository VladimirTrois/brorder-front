<template>
  <div class="pagination">
    <IconButton
      size="xs"
      name="material-symbols:chevron-left"
      @click="changePage(currentPage - 1)"
      :disabled="currentPage === 1"
    />
    <span class="mx-2">{{ currentPage }} / {{ totalPages }}</span>
    <IconButton
      size="xs"
      name="material-symbols:chevron-right"
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
  @apply flex justify-center items-center cursor-pointer;
}
</style>