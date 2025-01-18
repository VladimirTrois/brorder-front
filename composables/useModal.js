// composables/useModal.js
import { ref } from 'vue';

export const useModal = () => {
  const isModalOpen = ref(false);
  const modalTitle = ref('');
  const modalMessage = ref('');
  const modalColor = ref('');

  const openModal = (title, message, color) => {
    modalTitle.value = title;
    modalMessage.value = message;
    isModalOpen.value = true;
    modalColor.value = color ? color : '';
  };

  const closeModal = () => {
    isModalOpen.value = false;
  };

  return {
    isModalOpen,
    modalTitle,
    modalMessage,
    openModal,
    closeModal,
    modalColor,
  };
};
