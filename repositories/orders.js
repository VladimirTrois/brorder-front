export default (api) => ({
  getAll: (params) => api('/orders', { params }),
  stats: (params) => api('/orders/stats', { params }),
  getOne: (id) => {
    return api(`/orders/${id}`);
  },
  create: (data) =>
    api('/orders', {
      headers: {
        'Content-Type': 'application/ld+json',
      },
      method: 'POST',
      body: data,
    }),
  update: (id, data, selectedProperties) =>
    api(`/orders/${id}`, {
      headers: {
        'Content-Type': 'application/merge-patch+json',
      },
      method: 'PATCH',
      body: pickProperties(data, selectedProperties),
    }),
  delete: (id) => api(`/orders/${id}`, { method: 'DELETE' }),
});

function pickProperties(obj, props) {
  if (props) {
    return props.reduce((result, prop) => {
      if (obj.hasOwnProperty(prop)) {
        result[prop] = obj[prop];
      }
      return result;
    }, {});
  }
  return obj;
}
