import jwt from 'jsonwebtoken'

const authorizedUser = (req) => {
  const { headers } = req
  const { authorization } = headers

  try {

    const [_bearer, token] = authorization.split(' ')

    const { userId } = jwt.verify(token, process.env.JWT_SECRET)

    return userId

  } catch (error) {

    return ''
  }

}


/**
 * NOTE: Essa função será executada a cada requisição
 */
export const context = ({ req }) => {



  const loggedUserId = authorizedUser(req);

  return {
    loggedUserId
  }
}
