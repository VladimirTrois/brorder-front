export default (api) => ({
  getAll: (params) => api('/users', { params }),
  getOne: (id) => api(`/users/${id}`),
  create: (data) => api('/users', { method: 'POST', body: data }),
  update: (id, data) => api(`/users/${id}`, { method: 'PATCH', body: data }),
  delete: (id) => api(`/users/${id}`, { method: 'DELETE' }),
  // Add other methods as needed
});
