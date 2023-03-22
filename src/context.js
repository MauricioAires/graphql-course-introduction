import { api } from './lib/axios';

import { getPosts, makePostDataLoader } from './graphql/post';
import { getUsers, makeUserDataLoader } from './graphql/user';

export const context = () => {
  return {
    userDataLoader: makeUserDataLoader(getUsers(api)),
    getUsers: getUsers(api),
    postDataLoader: makePostDataLoader(getPosts(api)),
    getPosts: getPosts(api),
  };
};
