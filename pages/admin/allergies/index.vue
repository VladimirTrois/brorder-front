<template>
  <div>
    <div class="md:grid md:grid-cols-5">
      <div class="col-span-2">
        <AllergyForm />
      </div>
      <div class="col-span-3">3 cols</div>
      <ProductAllergies />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
});
useSeoMeta({
  title: "Allergies",
});
</script>