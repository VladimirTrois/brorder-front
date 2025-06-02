<template>
  <div class="allergyForm">
    <h3 class="mb-2">Liste des allergies</h3>
    <IconButton
      v-if="allergies.collection.length === 0"
      size="sm"
      name="material-symbols:refresh"
      @click="refreshPage"
    />
    <AllergyCard
      v-else
      class="grid gap-0"
      v-for="allergy in allergies.collection"
      :key="allergy.name"
      @click="allergies.allergy = allergy"
      :allergy="allergy"
    />
    <IconButton
      v-if="allergies.allergy.id"
      size="xs"
      name="material-symbols:add"
      @click="allergies.newAllergy"
    />
    <form class="mt-4 flex flex-wrap items-center" @submit.prevent="">
      <Input
        id="name"
        :placeHolder="
          allergies.allergy.id ? 'Éditer allergie' : 'Ajouter une allergie'
        "
        v-model="allergies.allergy.name"
        :error="allergies.formErrors.name"
        :resetError="() => (allergies.formErrors.name = '')"
      />
      <div class="flex">
        <IconButton
          v-if="allergies.allergy.id"
          size="sm"
          name="material-symbols:save"
          @click="handleSubmit"
        />
        <IconButton
          v-else
          size="sm"
          name="material-symbols:upload-rounded"
          @click="handleSubmit"
        />
        <IconButton
          v-if="allergies.allergy.id"
          size="sm"
          color="second"
          name="material-symbols:delete"
          @click="handleDelete"
        />
      </div>
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
</script>

<style lang="postcss">
.allergyForm {
  @apply m-auto grid grid-cols-1 max-w-fit text-sm md:text-base lg:text-xl bg-light_shades shadow-md shadow-primary_mono rounded p-2 overflow-auto;
}
</style>