export const getUsers =
  (api) =>
  (path = '') => {
    return api.get(`/users${path}`);
  };
