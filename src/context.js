import { api } from './lib/axios';

import { getPosts } from './graphql/post';
import { getUsers, makeUserDataLoader } from './graphql/user';

export const context = () => {
  return {
    userDataLoader: makeUserDataLoader(getUsers(api)),
    getUsers: getUsers(api),
    getPosts: getPosts(api),
  };
};
