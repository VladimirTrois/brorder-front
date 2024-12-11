<template>
  <form class="loginForm" id="adminLoginForm" @submit.prevent="handleSubmit">
    <h1 class="text-center font-bold">Login to admin</h1>
    <Input
      class="inputLogin"
      :id="username"
      placeHolder="Username"
      @change="errors.name = ''"
      @focus="errors.name = ''"
      @click="errors.name = ''"
      v-model="user.username"
      :error="errors.name"
    />
    <Input
      class="inputLogin"
      :id="password"
      type="password"
      placeHolder="Password"
      @change="errors.name = ''"
      @focus="errors.name = ''"
      @click="errors.name = ''"
      v-model="user.password"
      :error="errors.name"
    />
    <button type="submit" form="adminLoginForm" class="buttonLogin">
      Login
    </button>
  </form>
</template>

<script setup>
definePageMeta({
  layout: "login",
});
useSeoMeta({
  title: "Login",
});

const { authenticateUser } = useAuthStore(); // use authenticateUser action from  auth store
const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs

const user = ref({
  username: "",
  password: "",
});
const errors = reactive({
  username: "",
  password: "",
});

const handleSubmit = async () => {
  console.log("Submit");
  console.log(user.value);
  await authenticateUser(user.value); // call authenticateUser and pass the user object
  // redirect to homepage if user is authenticated
  if (authenticated) {
    router.push("/");
  }
};
</script>

<style lang="postcss">
.loginForm {
  @apply m-auto sm:w-1/2 px-2 pt-4 pb-4;
}
.inputLogin {
  @apply m-auto my-4;
}
.buttonLogin {
  @apply block m-auto bg-dark_accent text-white text-base font-bold uppercase py-3 rounded-md shadow hover:shadow-lg outline-none w-1/2;
  &:hover {
    @apply bg-primComplementary;
  }
  &:active {
    @apply bg-dark_accent;
  }
}
</style>

