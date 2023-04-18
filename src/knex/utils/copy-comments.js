import { comments } from '../../../db.json'
import { dateISOtoMySQL } from './date-iso-to-mysql'
import { knex } from '../'

const commentsForDb = comments.map(comment => {

  return {
    comment: comment.comment,
    user_id: comment.userId,
    post_id: comment.postId,
    created_at: dateISOtoMySQL(comment.createdAt)
  }
})

// knex('comments').insert(commentsForDb).then(res => {
//   console.log(res)
// }).catch(err => {
//   console.log(err)
// }).finally(() => {
//   knex.destroy()
// })


//  NOTE: COMANDO => node -r dotenv/config -r sucrase/register filename
