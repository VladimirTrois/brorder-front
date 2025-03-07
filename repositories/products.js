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
  update: (id, data) => {
    return api(`/products/${id}`, {
      headers: {
        'Content-Type': 'application/merge-patch+json',
      },
      method: 'PATCH',
      body: pickForPatch(data),
    });
  },
  delete: (id) => api(`/products/${id}`, { method: 'DELETE' }),
});

function pickForPatch(order) {
  return pickProperties(order, [
    'name',
    'price',
    'weight',
    'isAvailable',
    'stock',
    'image',
    'order',
  ]);
}

function pickProperties(obj, props) {
  return props.reduce((result, prop) => {
    if (obj.hasOwnProperty(prop)) {
      result[prop] = obj[prop];
    }
    return result;
  }, {});
}
