export const useOrder = () =>
  useState('order', () => ({
    name: '',
    pitch: '',
    pickUpDate: '',
    items: [],
  }));

export const useCreateOrder = () => {
  const order = useOrder();

  const resetOrder = () => {
    order.value.name = '';
    order.value.pitch = '';
    order.value.pickUpDate = '';
    order.value.items = [];
    return order;
  };

  const loadOrder = async (page) => {
    const response = ref(null);
    const error = ref(null);
    const loading = ref(true);

    const urlCreateOrder = import.meta.env.NUXT_API_URL + '/orders';
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/ld+json',
        'content-type': 'application/ld+json',
      },
      body: order.value,
    };

    try {
      response = await $fetch(urlCreateOrder, requestOptions);
    } catch (err) {
      error.value = err.toString();
    } finally {
      loading.value = false;
    }
    return { response, error, loading };
  };

  return { resetOrder, loadOrder };
};

export const isOrderValid = () => {
  //check Name
  const regexName = new RegExp('[A-Za-z][A-Za-z0-9_]{1,29}');
  errors.name = !order.value.name
    ? 'This field is required.'
    : !regexName.test(order.value.name)
    ? 'Invalid.'
    : '';
  if (errors.name !== '') {
    return false;
  }

  //check Pitch
  const regexPitch = new RegExp('^[A-Za-z][0-9][0-9]$');
  const regexPitchSmall = new RegExp('^[A-Za-z][1-9]$');
  order.value.pitch = regexPitchSmall.test(order.value.pitch)
    ? insertInString(order.value.pitch, 1, '0')
    : order.value.pitch;

  errors.pitch = !order.value.pitch
    ? 'This field is required'
    : !regexPitch.test(order.value.pitch)
    ? 'Invalid'
    : '';
  if (errors.pitch !== '') {
    return false;
  }

  //check Items
  errors.items = order.value.items.length > 0 ? '' : 'This field is required';
  if (errors.items !== '') {
    return false;
  }

  //No errors then form is valid
  return true;
};
