// composables/useModal.js
import { ref } from 'vue';
import { useAuthStore } from '~/stores/auth';

export const useImages = () => {
  const accessToken = useCookie('accessToken').value;
  const authStore = useAuthStore();
  // Reactive references
  const images = ref([]);
  const error = ref(null);

  const fetchImages = async () => {
    try {
      const response = await $fetch('/admin/images', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response) {
        images.value = response.images;
      }
    } catch (err) {
      alert('Failed to fetch images.');
    }
  };

  const postImage = async (image) => {
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await $fetch('/admin/images', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        method: 'POST',
        body: formData,
      });

      fetchImages();
      return response;
    } catch (error) {
      alert('Failed to upload the image.');
    }
  };

  // Handle image deletion
  const deleteImage = async (filename) => {
    if (!confirm(`Are you sure you want to delete ${filename}?`)) {
      return;
    }

    try {
      const response = await $fetch(`/admin/images`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          filename: filename,
        },
        method: 'DELETE',
      });

      if (response.success) {
        fetchImages(); // Refresh the image list
      }
    } catch (error) {
      alert('Failed to delete the image.');
    }
  };

  return {
    images,
    fetchImages,
    postImage,
    deleteImage,
  };
};
