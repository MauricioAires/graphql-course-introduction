import jwt from 'jsonwebtoken'
import { UsersApi } from './user'
import { cookieParser } from './utils/cookie-parser'


const verifyJwtToken = async (token) => {
  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET)

    const usersApi = new UsersApi()

    /**
     * NOTE: como o data source está sendo utilizado, fora do
     * contexto do graphQL é necessário que execute a função initialize
     * manualmente.
     */
    usersApi.initialize({})

    const foundUser = await usersApi.getUser(userId)

    if (foundUser.token !== token) {
      return ''
    }

    return userId

  } catch (err) {
    return ''
  }

}

const authorizedUser = async (req) => {
  const { headers } = req
  const { authorization } = headers

  if (authorization === undefined) return ''

  try {

    const [_bearer, token] = authorization.split(' ')

    return await verifyJwtToken(token)
  } catch (err) {
    return ''
  }

}


/**
 * NOTE: Essa função será executada a cada requisição
 */
export const context = async ({ req, res }) => {

  let loggedUserId = await authorizedUser(req);

  const cookieHeader = req.headers.cookie

  if (!loggedUserId) {
    if (cookieHeader) {

      const { graphqlcursojsonwebtoken } = cookieParser(cookieHeader)

      loggedUserId = await verifyJwtToken(graphqlcursojsonwebtoken)
    }
  }

  return {
    loggedUserId,
    res
  }
}
