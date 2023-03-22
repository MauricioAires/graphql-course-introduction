export const getPosts = (api) => {
  return (path = '') => api.get(`/posts${path}`);
};
