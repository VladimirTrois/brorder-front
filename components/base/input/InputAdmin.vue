<template>
  <div>
    <div class="group">
      <input
        :id="id"
        class="peer"
        autocomplete="off"
        :type="type"
        @click="reset"
        @focus="reset"
        v-model="model"
        placeholder=" "
      />
      <label class="textLabel" :for="id">{{ placeHolder }}</label>
    </div>
    <div v-if="error" class="inputError">
      <span>{{ error }}</span>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["onReset", "reset"]);
const props = defineProps({
  type: {
    type: String,
    default: "text",
  },
  id: String,
  placeHolder: String,
  error: "",
});

const reset = () => {
  if (props.error) {
    emit("reset");
  }
};
const model = defineModel();
</script>

<style lang="postcss" scoped>
div {
  @apply relative m-2 max-w-[fit-content];
}

input {
  @apply block outline-none px-3 py-3 rounded-lg bg-transparent border-2 border-primary 
  group-hover:border-light_shades
  group-focus-within:!border-primary;
}
label {
  @apply absolute left-[9px] top-px text-xs transition-all duration-300 px-1 transform -translate-y-1/2 pointer-events-none 
  peer-placeholder-shown:top-1/2 
  peer-placeholder-shown:text-sm 
  group-focus-within:!top-px 
  group-focus-within:!text-sm;
}

.textLabel {
  @apply text-light_shades group-focus-within:!text-primary;
}
.inputError {
  @apply text-second_a25 bottom-2;
}
</style>