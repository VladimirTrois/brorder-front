// composables/useModal.js
import { ref } from 'vue';

export const useModal = () => {
  const isModalOpen = ref(false);
  const modalTitle = ref('');
  const modalContent = ref('');
  const modalType = ref('');

  const openModal = (title, content, type) => {
    isModalOpen.value = true;
    modalTitle.value = title;
    modalContent.value = content;
    modalType.value = type ? type : 'message';
  };

  const closeModal = () => {
    isModalOpen.value = false;
  };

  return {
    isModalOpen,
    modalTitle,
    modalContent,
    modalType,
    openModal,
    closeModal,
  };
};
