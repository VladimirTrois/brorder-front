export default (api) => ({
  update: (id, data) => {
    return api(`/product_allergies/${id}`, {
      parseResponse: (txt) => JSON.parse(txt),
      headers: {
        'Content-Type': 'application/merge-patch+json',
      },
      method: 'PATCH',
      body: data,
    });
  },
});
