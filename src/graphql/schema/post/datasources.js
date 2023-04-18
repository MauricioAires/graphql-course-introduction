import { RESTDataSource } from 'apollo-datasource-rest';
import { makePostDataLoader } from './dataloader';
import {
  createPostFn,
  deletePostFn,
  updatePostFn,
} from './utils/post-repository';

export class PostsApi extends RESTDataSource {
  constructor() {
    super();

    this.baseURL = `${process.env.API_BASE_URL}/posts`;

    this.dataLoader = makePostDataLoader(this.getPosts.bind(this));
  }

  async getPost(id) {
    return this.get(id, undefined, {
      cacheOptions: {
        ttl: 0, // 1 Minuto
      },
    });
  }

  async getPosts(urlParam = {}) {
    return this.get('', urlParam, {
      cacheOptions: {
        ttl: 0, // 1 Minuto
      },
    });
  }

  async createPost(postData) {
    return createPostFn(postData, this);
  }

  async updatePost(postId, postData) {
    return updatePostFn(postId, postData, this);
  }

  async deletePost(postId) {
    return deletePostFn(postId, this);
  }

  postDataLoaderUserId(id) {
    return this.dataLoader.load(id);
  }
}
