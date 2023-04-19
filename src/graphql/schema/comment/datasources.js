
import { ValidationError } from 'apollo-server'
import { SQLDataSource } from '../../datasource/sql/sql-datasource'


const commentReducer = (comment) => {
  return {
    id: comment.id,
    comment: comment.comment,
    user_id: comment.user_id,
    createdAt: new Date(comment.created_at).toISOString()
  }
}
export class CommentSQLDataSource extends SQLDataSource {

  async getByPostId(post_id) {

    const comments = await this.db('comments').where({ post_id });

    return comments.map(comment => commentReducer(comment))
  }

  async getById(id) {
    return this.db('comments').where('id', '=', id)
  }

  async create({
    userId, postId, comment
  }) {

    const partialComment = {
      user_id: userId,
      post_id: postId,
      comment
    }

    const exists = await this.db('comments').where(partialComment)

    if (exists.length) {
      throw new ValidationError('Comment already created')
    }

    const created = await this.db('comments').insert(partialComment)

    return {
      id: created[0],
      createdAt: new Date().toISOString(),
      ...partialComment
    }
  }
}
