export default (api) => ({
  getAll: (params) => api('/products', { params }),
  getOne: (id) => api(`/products/${id}`),
  create: (data) =>
    api('/products', {
      headers: {
        'Content-Type': 'application/ld+json',
      },
      method: 'POST',
      body: data,
    }),
  update: (id, data, selectedProperties) => {
    return api(`/products/${id}`, {
      headers: {
        'Content-Type': 'application/merge-patch+json',
      },
      method: 'PATCH',
      body: pickProperties(data, selectedProperties),
    });
  },
  delete: (id) => api(`/products/${id}`, { method: 'DELETE' }),
});

function pickProperties(obj, props) {
  return props.reduce((result, prop) => {
    if (obj.hasOwnProperty(prop)) {
      result[prop] = obj[prop];
    }
    return result;
  }, {});
}
