<template>
  <Teleport to="body">
    <ModalDialog
      v-if="type === 'message'"
      :show="isOpen"
      @close="$emit('close')"
    >
      <template #header>
        <h3>{{ title }}</h3>
      </template>
      <template #body>
        <div class="text-center">
          {{ content }}
        </div>
      </template>
    </ModalDialog>
    <ModalDialog
      v-else-if="type === 'showOrder'"
      :show="isOpen"
      @close="
        $emit('refresh');
        $emit('close');
      "
    >
      <template #header>
        <h3>{{ title }}</h3>
      </template>
      <template #body>
        <OrderView :order="content" />
      </template>
    </ModalDialog>
    <ModalDialog
      v-else-if="type === 'sellOrder'"
      :show="isOpen"
      @close="$emit('close')"
    >
      <template #header>
        <h3>{{ title }}</h3>
      </template>
      <template #body>
        <OrderView :order="content" />
      </template>
      <template #footer>
        <div class="grid grid-cols-2">
          <IconButton
            class="mr-3"
            name="material-symbols:check-box"
            @click="
              $emit('sell');
              $emit('close');
            "
          />
          <IconButton
            class="ml-9"
            color="second"
            name="material-symbols:cancel"
            @click="$emit('close')"
          />
        </div>
      </template>
    </ModalDialog>
    <ModalDialog
      v-else-if="type === 'orderExist'"
      :show="isOpen"
      @close="$emit('close')"
    >
      <template #header>
        <h3>{{ title }}</h3>
      </template>
      <template #body>
        <div class="text-left font-bold text-xl mb-2">
          Une commande existe déjà :
        </div>
        <OrderView :order="content[1]" />
        <div class="flex justify-start">
          <Button
            class="modal-default-button"
            @click="
              $emit('refresh');
              $emit('close');
            "
          >
            Garder / Keep
          </Button>
        </div>
        <div class="text-left font-bold text-xl mb-2">Nouvelle Commande :</div>
        <OrderView :order="content[2]" />
      </template>
      <template #footer>
        <div class="grid grid-cols-2">
          <Button
            class="modal-default-button"
            @click="
              $emit('close');
              $emit('replace');
            "
          >
            Remplacer
          </Button>
          <IconButton
            class="ml-9"
            color="second"
            name="material-symbols:cancel"
            @click="$emit('close')"
          />
        </div>
      </template>
    </ModalDialog>
    <ModalDialog
      v-else-if="type === 'error'"
      :show="isOpen"
      @close="$emit('close')"
      color="second"
    >
      <template #header>
        <h3>{{ title }}</h3>
      </template>
      <template #body>
        <div class="text-center"></div>
        <OrderView :order="order" />
      </template>
      <template #footer>
        <div class="grid mt-2">
          <IconButton
            color="second"
            name="material-symbols:refresh"
            @click="
              $emit('refresh');
              $emit('close');
            "
          />
        </div>
      </template>
    </ModalDialog>
  </Teleport>
</template>

<script setup>
const props = defineProps(["content", "isOpen", "title", "order", "type"]);

defineEmits(["close", "replace", "refresh", "sell", "renew"]);
</script>

<style lang="postcss">
</style>