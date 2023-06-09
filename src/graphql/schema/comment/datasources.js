
import { ValidationError } from 'apollo-server'
import { SQLDataSource } from '../../datasource/sql/sql-datasource'
import { pubSub, CREATED_COMMENT_TRIGGER } from './resolvers'


const commentReducer = (comment) => {
  return {
    id: comment.id,
    comment: comment.comment,
    user_id: comment.user_id,
    createdAt: new Date(comment.created_at).toISOString()
  }
}
export class CommentSQLDataSource extends SQLDataSource {

  constructor(dbConnection) {
    super(dbConnection);

    this.tableName = 'comments';
  }

  async getByPostId(post_id) {

    const comments = await this.db(this.tableName).where({ post_id });

    return comments.map(comment => commentReducer(comment))
  }

  async getById(id) {
    return this.db(this.tableName).where('id', '=', id)
  }

  async create({
    userId, postId, comment
  }) {

    const partialComment = {
      user_id: userId,
      post_id: postId,
      comment
    }

    const exists = await this.db(this.tableName).where(partialComment)

    if (exists.length) {
      throw new ValidationError('Comment already created')
    }

    const created = await this.db(this.tableName).insert(partialComment)

    const result = {
      id: created[0],
      createdAt: new Date().toISOString(),
      ...partialComment
    }

    pubSub.publish(CREATED_COMMENT_TRIGGER, {
      createdComment: result
    })

    return result
  }

  async batchLoaderCallback(post_ids) {
    const query = this.db(this.tableName).whereIn('post_id', post_ids);
    const comments = await query;
    console.log(query.toString())

    const filteredComments = post_ids.map(post_id => {
      return comments.filter(comment => String(comment.post_id) === String(post_id))
        .map(comment => commentReducer(comment))
    })

    return filteredComments
  }
}
