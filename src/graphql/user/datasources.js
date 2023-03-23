import { RESTDataSource } from 'apollo-datasource-rest';
import { makeUserDataLoader } from './dataloaders';

export class UsersApi extends RESTDataSource {
  constructor() {
    super();

    this.baseURL = `${process.env.API_BASE_URL}/users`;
    this.dataLoader = makeUserDataLoader(this.getUsers.bind(this));
  }

  async getUsers(urlParam = {}) {
    return this.get('', urlParam, {
      cacheOptions: {
        ttl: 60 * 1, // 1 Minuto
      },
    });
  }

  async getUser(id) {
    return this.get(id, undefined, {
      cacheOptions: {
        ttl: 60 * 1, // 1 Minuto
      },
    });
  }

  userDataLoaderPostId(id) {
    return this.dataLoader.load(id);
  }
}
