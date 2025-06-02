<template>
  <div>
    <label :for="id" class="block mb-2">{{ label }}</label>
    <select :name="id" :id="id" v-model="model" class="productSelector">
      <option v-for="item in options" :key="item.id" :value="item">
        {{ item.name }}
      </option>
    </select>
  </div>
</template>

<script setup>
defineProps({
  id: String,
  label: String,
  options: [],
});
const model = defineModel();
</script>