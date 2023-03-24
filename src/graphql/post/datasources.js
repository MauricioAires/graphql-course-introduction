import { RESTDataSource } from 'apollo-datasource-rest';
import { makePostDataLoader } from './dataloader';

export class PostsApi extends RESTDataSource {
  constructor() {
    super();

    this.baseURL = `${process.env.API_BASE_URL}/posts`;

    this.dataLoader = makePostDataLoader(this.getPosts.bind(this));
  }

  async getPost(id) {
    return this.get(id, undefined, {
      cacheOptions: {
        ttl: 60 * 1, // 1 Minuto
      },
    });
  }

  async getPosts(urlParams = {}) {
    return this.get('', urlParams, {
      cacheOptions: {
        ttl: 60 * 1, // 1 Minuto
      },
    });
  }

  postDataLoaderUserId(id) {
    return this.dataLoader.load(id);
  }
}