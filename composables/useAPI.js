import repositories from '~/repositories';

export const useAPI = () => {
  const { $api } = useNuxtApp();
  return repositories($api);
};

export const useAPIV2 = () => {
  const { $apiV2 } = useNuxtApp();
  return repositories($apiV2);
};
