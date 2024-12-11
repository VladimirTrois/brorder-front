<template>
  <div class="formInput group">
    <input
      class="formInputText peer"
      autocomplete="off"
      :type="type"
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
      class="inset-0 absolute border-2 border-dark_shades rounded-lg pointer-events-none mt-[-9px] invisible peer-placeholder-shown:visible group-focus-within:!border-dark_shades group-focus-within:border-2"
    >
      <legend
        class="ml-2 px-0 text-xs transition-all duration-300 invisible max-w-[0.01px] group-focus-within:max-w-full group-focus-within:px-1 whitespace-nowrap"
      >
        {{ error }}
      </legend>
    </fieldset>
    <fieldset
      v-else
      class="inset-0 absolute border border-gray-300 rounded-lg pointer-events-none mt-[-9px] invisible peer-placeholder-shown:visible group-focus-within:!border-main group-focus-within:border-2 group-hover:border-main group-hover:border-10"
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
      class="inset-0 absolute border-2 border-dark_shades rounded-lg pointer-events-none mt-[-9px] visible peer-placeholder-shown:invisible group-focus-within:border-2"
    >
      <legend class="ml-2 text-xs invisible px-1 max-w-full whitespace-nowrap">
        {{ error }}
      </legend>
    </fieldset>
    <fieldset
      v-else
      class="inset-0 absolute border border-1 border-main rounded-lg pointer-events-none mt-[-9px] visible peer-placeholder-shown:invisible group-focus-within:border-2 group-focus-within:!border-light_shades group-hover:border-gray-800"
    >
      <legend class="ml-2 text-xs invisible px-1 max-w-full whitespace-nowrap">
        {{ placeHolder }}
      </legend>
    </fieldset>
  </div>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: "text",
  },
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
  @apply outline-none px-3 py-3 rounded-lg;
}

.formInputLabel {
  @apply absolute left-[9px] top-px text-xs text-black transition-all duration-300 px-1 transform -translate-y-1/2 pointer-events-none
        peer-placeholder-shown:top-1/2
        peer-placeholder-shown:text-sm
        group-focus-within:!top-px 
        group-focus-within:!text-xs 
        group-focus-within:!text-main;
}
.error {
  @apply absolute left-[9px] top-px text-xs text-dark_shades transition-all duration-300 px-1 transform -translate-y-1/2
    peer-placeholder-shown:top-1/2
    peer-placeholder-shown:text-sm
    group-focus-within:!top-px 
    group-focus-within:!text-xs 
    group-focus-within:!text-dark_shades;
}
</style>