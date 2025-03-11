<template>
  <div class="InputContainer group">
    <input
      :id="id"
      class="outline-none px-2 py-2 peer bg-transparent"
      autocomplete="off"
      :type="type"
      @focus="
        if (error !== '') {
          resetError();
        }
      "
      v-model="model"
      placeholder=" "
    />
    <label v-if="error" :for="id" class="inputLabelBase errorInputColor">
      {{ error }}
    </label>
    <label v-else :for="id" class="inputLabelBase inputColor">
      {{ placeHolder }}
    </label>

    <!--This fieldset+legend is used for when the border and notch transition-->
    <fieldset
      class="fieldsetBase invisible peer-placeholder-shown:visible"
      :class="error ? 'errorFieldsetColor' : 'fieldsetColor'"
    >
      <legend
        class="ml-2 px-0 text-sm transition-all duration-300 invisible max-w-[0.01px] group-focus-within:max-w-full group-focus-within:px-1 whitespace-nowrap"
      >
        {{ error ? error : placeHolder }}
      </legend>
    </fieldset>

    <!--This fieldset+legend always has a notch and is shown when the input is filled, instead of the other, so the notch doesnt vanish when you unfocus the field-->
    <fieldset
      class="fieldsetBase visible peer-placeholder-shown:invisible"
      :class="error ? 'errorFieldsetColor' : 'fieldsetColor'"
    >
      <legend class="ml-2 text-sm invisible px-1 max-w-full whitespace-nowrap">
        {{ error ? error : placeHolder }}
      </legend>
    </fieldset>
  </div>
</template>

<script setup>
defineProps({
  id: String,
  type: {
    type: String,
    default: "text",
  },
  placeHolder: String,
  error: String,
  resetError: Function,
});
const model = defineModel();
</script>

<style lang="postcss">
.InputContainer {
  @apply relative mx-1 my-2 max-w-[fit-content] mb-4;
}

.inputLabelBase {
  @apply absolute left-[9px] top-px text-sm transition-all duration-300 px-1 transform -translate-y-1/2 pointer-events-none
  peer-placeholder-shown:top-1/2 
  peer-placeholder-shown:text-base
  md:peer-placeholder-shown:text-lg
  group-focus-within:!top-px 
  group-focus-within:!text-sm;
}
.inputColor {
  @apply text-black group-focus-within:!text-primary;
}
.errorInputColor {
  @apply text-second group-focus-within:!text-second;
}
.fieldsetBase {
  @apply inset-0 absolute rounded-lg pointer-events-none mt-[-9px] 
  border group-focus-within:border-2;
}
.fieldsetColor {
  @apply border-primary_mono group-focus-within:!border-primary group-hover:!border-primary;
}
.errorFieldsetColor {
  @apply border-second_a20 group-focus-within:!border-second group-hover:!border-second;
}
</style>