<template>
  <div class="switchMultiple">
    <input
      id="switch-y"
      name="tripple"
      type="radio"
      class="switch-input"
      @input="$emit('update:modelValue', false)"
    />
    <label for="switch-y" class="switch-label switch-label-y">A valider</label>

    <input
      id="switch-i"
      name="tripple"
      type="radio"
      class="switch-input"
      checked
      @input="$emit('update:modelValue', null)"
    />
    <label for="switch-i" class="switch-label switch-label-i">Toutes</label>

    <input
      id="switch-n"
      name="tripple"
      type="radio"
      class="switch-input"
      @input="$emit('update:modelValue', true)"
    />
    <label for="switch-n" class="switch-label switch-label-n">Vendue</label>
    <span class="switch-selector"></span>
  </div>
</template>

<script setup>
defineProps(["modelValue"]);
defineEmits(["update:modelValue"]);
</script>

<style lang="postcss">
.switchMultiple {
  @apply m-2 relative inline-flex items-center me-2 cursor-pointer rounded-xl;
}
.switch-label {
  @apply relative float-left text-center  font-bold cursor-pointer;
  z-index: 2;
  width: 100px;
}

.switch-input {
  display: none;
}

.switch-input:checked + .switch-label {
  color: #fff;
  transition: 0.15s ease-out;
  transition-property: color, text-shadow;
}

.switch-input:checked + .switch-label-y ~ .switch-selector {
  @apply bg-primary;
  transform: translateX(0%);
}
.switch-input:checked + .switch-label-i ~ .switch-selector {
  @apply bg-gradient-to-r from-primary to-second_a20;
  transform: translateX(100%);
}
.switch-input:checked + .switch-label-n ~ .switch-selector {
  @apply bg-second_a20;
  transform: translateX(200%);
}

.switch-selector {
  position: absolute;
  z-index: 1;
  top: -3px;
  left: 0px;
  display: block;
  width: 100px;
  height: 32px;
  border-radius: 32px;
  transition: all 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
}
</style>