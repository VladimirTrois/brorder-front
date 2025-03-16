<template>
  <div>
    <h3 class="mb-2">Liste des allergies</h3>
    <IconButton
      v-if="allergies.collection.length === 0"
      size="sm"
      name="material-symbols:refresh"
      @click="refreshPage"
    />

    <div
      v-else
      class="grid gap-0"
      v-for="allergy in allergies.collection"
      :key="allergy.name"
    >
      <AllergyCard @click="allergies.allergy = allergy" :allergy="allergy" />
    </div>
    <IconButton
      v-if="allergies.allergy.id"
      size="xs"
      name="material-symbols:add"
      @click="allergies.newAllergy"
    />
    <form class="flex place-items-center mt-4" @submit.prevent="handleSubmit">
      <Input
        id="name"
        :placeHolder="
          allergies.allergy.id ? 'Éditer allergie' : 'Ajouter une allergie'
        "
        v-model="allergies.allergy.name"
        :error="allergies.formErrors.name"
        :resetError="() => (allergies.formErrors.name = '')"
      />
      <IconButton
        v-if="allergies.allergy.id"
        size="sm"
        name="material-symbols:save"
        type="submit"
      />
      <IconButton
        v-if="allergies.allergy.id"
        size="sm"
        color="second"
        name="material-symbols:delete"
        @click="handleDelete"
      />
      <IconButton
        v-else
        size="sm"
        name="material-symbols:upload-rounded"
        type="submit"
      />
    </form>
  </div>
</template>

<script setup>
const allergies = useAllergies();

const handleSubmit = async () => {
  if (allergies.validateAllergyForm()) {
    if (allergies.allergy.id) {
      await allergies.update(allergies.allergy);
    } else {
      await allergies.create(allergies.allergy);
    }
    refreshPage();
  }
};

const handleDelete = async () => {
  if (allergies.allergy.id) {
    await allergies.delete(allergies.allergy);
    refreshPage();
  }
};

const refreshPage = async () => {
  allergies.newAllergy();
  await allergies.fetchAllergies();
};

onMounted(() => {
  refreshPage();
});
</script>