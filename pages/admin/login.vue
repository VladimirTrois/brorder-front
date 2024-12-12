<template>
  <form class="loginForm" id="adminLoginForm" @submit.prevent="handleSubmit">
    <h1 class="text-center text-light_shades font-semibold">BRORDER</h1>
    <InputAdmin
      class="inputLogin"
      id="username"
      placeHolder="Username"
      v-model="user.username"
      :error="errors.username"
      @reset="errors.username = ''"
    />
    <InputAdmin
      class="inputLogin"
      id="password"
      type="password"
      placeHolder="Password"
      v-model="user.password"
      :error="errors.password"
      @reset="errors.password = ''"
    />
    <button type="submit" form="adminLoginForm" class="buttonLogin">
      Login
    </button>
    <div class="error" v-if="errors.login">
      <span>{{ errors.login }}</span>
    </div>
  </form>
</template>

<script setup>
definePageMeta({
  layout: "login",
});
useSeoMeta({
  title: "Login",
});

const authStore = useAuthStore();
const { authenticateUser } = useAuthStore(); // use authenticateUser action from  auth store
const { user, authenticated, errors } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs
const router = useRouter();

const handleSubmit = async () => {
  if (authStore.isUserValid()) {
    await authenticateUser(user);
    // await authenticateUser(user); // call authenticateUser and pass the user object
    // redirect to homepage if user is authenticated
    if (authenticated.value) {
      console.log("authenticated");
      router.push("/admin");
    }
  }
};
</script>

<style lang="postcss">
.loginForm {
  @apply mt-10 p-6 bg-primary_mono rounded-lg shadow-lg shadow-primary_a50;
}
.inputLogin {
  @apply m-auto my-4 rounded-lg;
}
.buttonLogin {
  @apply block mt-4 m-auto text-base font-bold uppercase py-1 rounded-md outline-none w-1/2 border-4
  shadow-primary bg-second text-light_shades border-second;
  &:hover {
    @apply bg-primary text-second;
  }
  &:active {
    @apply bg-second text-light_shades;
  }
}
.error {
  @apply mt-4 py-1 text-light_shades rounded-lg text-center font-extrabold bg-second;
}
</style>

