<template>
  <NuxtLayout>
    <Button class="text-center m-2" color="second" @click="handleError">
      Retour
    </Button>
    <div v-if="error" class="m-2 text-center text-second">
      <h1>Error {{ error.statusCode }}</h1>
      <p>{{ error.message }}</p>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { useError } from "#app";

const error = useError();
const router = useRouter();

const handleError = () => {
  console.error("Current error:", error.value);
  const currentRoute = router.currentRoute.value;
  clearError({ redirect: currentRoute.fullPath });
};
</script>

