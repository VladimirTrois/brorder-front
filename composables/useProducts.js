export const useProducts = () => {

  const getCollection = async (page) => {
    const url = "/products?page=" + page
    const { data, status, error, refresh, clear } = useFetch(import.meta.env.VITE_API_URL + url)
    return { data, status, error, refresh, clear };
  }

  return {
    getCollection,
  }
};