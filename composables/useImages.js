// composables/useModal.js
import { ref } from 'vue';

export const useImages = () => {
  // Reactive references
  const images = ref([]);
  const error = ref(null);

  const fetchImages = async () => {
    try {
      const response = await fetch('/api/images');
      const data = await response.json();

      if (data.error) {
        error.value = data.error;
      } else {
        images.value = data.images;
      }
    } catch (err) {
      error.value = 'Failed to fetch images.';
    }
  };

  const postImage = async (image) => {
    const formData = new FormData();
    formData.append('image', image);

    try {
      await fetch('/api/images', {
        method: 'POST',
        body: formData,
      });

      fetchImages();
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload the image.');
    }
  };

  // Handle image deletion
  const deleteImage = async (filename) => {
    if (!confirm(`Are you sure you want to delete ${filename}?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/images?filename=${filename}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (data.success) {
        fetchImages(); // Refresh the image list
      } else {
        alert(`Failed to delete image: ${data.message}`);
      }
    } catch (error) {
      console.error('Error deleting image:', error);
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
