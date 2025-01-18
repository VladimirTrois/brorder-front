import repositories from '~/repositories';

export const useAPI = () => {
  const { $api } = useNuxtApp();
  return repositories($api);
};
