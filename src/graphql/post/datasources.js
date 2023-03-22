import { RESTDataSource } from 'apollo-datasource-rest';

export class PostsApi extends RESTDataSource {
  constructor() {
    super();

    this.baseURL = `${process.env.API_BASE_URL}/posts`;
  }

  async getPosts(urlParams = {}) {
    return this.get('', urlParams);
  }

  async getPost(id) {
    return this.get(id);
  }
}
