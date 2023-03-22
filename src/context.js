import { api } from './lib/axios';

import { getUsers, makeUserDataLoader } from './graphql/user';

export const context = () => {
  return {
    userDataLoader: makeUserDataLoader(getUsers(api)),
    getUsers: getUsers(api),
    getPosts: (path = '') => api.get(`/posts${path}`),
  };
};
