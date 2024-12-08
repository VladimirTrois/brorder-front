<template>
  <div class="formInput group">
    <input
      autocomplete="off"
      type="text"
      class="formInputText peer"
      @click="click"
      @focus="focus"
      @change="change"
      v-model="model"
      placeholder=" "
    />
    <label v-if="error" class="error">{{ error }}</label>
    <label v-else class="formInputLabel">{{ placeHolder }}</label>

    <!--This fieldset+legend is used for when the border and notch transition-->
    <fieldset
      v-if="error"
      class="inset-0 absolute border-2 border-secondary rounded-lg pointer-events-none mt-[-9px] invisible peer-placeholder-shown:visible group-focus-within:!border-secondary group-focus-within:border-2"
    >
      <legend
        class="ml-2 px-0 text-xs transition-all duration-300 invisible max-w-[0.01px] group-focus-within:max-w-full group-focus-within:px-1 whitespace-nowrap"
      >
        {{ error }}
      </legend>
    </fieldset>
    <fieldset
      v-else
      class="inset-0 absolute border border-gray-300 rounded-lg pointer-events-none mt-[-9px] invisible peer-placeholder-shown:visible group-focus-within:!border-primary group-focus-within:border-2 group-hover:border-primary group-hover:border-10"
    >
      <legend
        class="ml-2 px-0 text-xs transition-all duration-300 invisible max-w-[0.01px] group-focus-within:max-w-full group-focus-within:px-1 whitespace-nowrap"
      >
        {{ placeHolder }}
      </legend>
    </fieldset>

    <!--This fieldset+legend always has a notch and is shown when the input is filled, instead of the other, so the notch doesnt vanish when you unfocus the field-->
    <fieldset
      v-if="error"
      class="inset-0 absolute border-2 border-secondary rounded-lg pointer-events-none mt-[-9px] visible peer-placeholder-shown:invisible group-focus-within:border-2"
    >
      <legend class="ml-2 text-xs invisible px-1 max-w-full whitespace-nowrap">
        {{ error }}
      </legend>
    </fieldset>
    <fieldset
      v-else
      class="inset-0 absolute border border-1 border-primary rounded-lg pointer-events-none mt-[-9px] visible peer-placeholder-shown:invisible group-focus-within:border-2 group-focus-within:!border-secondComplementary group-hover:border-gray-800"
    >
      <legend class="ml-2 text-xs invisible px-1 max-w-full whitespace-nowrap">
        {{ placeHolder }}
      </legend>
    </fieldset>
  </div>
</template>

<script setup>
defineProps({
  id: String,
  placeHolder: String,
  error: String,
});
const model = defineModel();
</script>

<style lang="postcss">
.formInput {
  @apply relative m-2 max-w-[fit-content];
}

.formInputText {
  @apply outline-none px-3 py-3;
}

.formInputLabel {
  @apply absolute left-[9px] top-px text-xs text-primary transition-all duration-300 px-1 transform -translate-y-1/2 pointer-events-none
        peer-placeholder-shown:top-1/2
        peer-placeholder-shown:text-sm
        group-focus-within:!top-px 
        group-focus-within:!text-xs 
        group-focus-within:!text-primary;
}
.error {
  @apply absolute left-[9px] top-px text-xs text-secondary transition-all duration-300 px-1 transform -translate-y-1/2
    peer-placeholder-shown:top-1/2
    peer-placeholder-shown:text-sm
    group-focus-within:!top-px 
    group-focus-within:!text-xs 
    group-focus-within:!text-secondary;
}
</style>