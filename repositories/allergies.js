export default (api) => ({
  getAll: (params) => api('/allergies', { params }),
  create: (data) =>
    api('/allergies', {
      headers: {
        'Content-Type': 'application/ld+json',
      },
      method: 'POST',
      body: data,
    }),
  update: (id, data) =>
    api(`/allergies/${id}`, {
      headers: {
        'Content-Type': 'application/merge-patch+json',
      },
      method: 'PATCH',
      body: pickProperties(data),
    }),
  delete: (id) =>
    api(`/allergies/${id}`, {
      method: 'DELETE',
    }),
});
