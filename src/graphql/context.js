import jwt from 'jsonwebtoken'
import { UsersApi } from './user'

const authorizedUser = async (req) => {
  const { headers } = req
  const { authorization } = headers

  try {

    const [_bearer, token] = authorization.split(' ')

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
    console.log(err)
    return ''
  }

}


/**
 * NOTE: Essa função será executada a cada requisição
 */
export const context = async ({ req }) => {



  const loggedUserId = await authorizedUser(req);

  return {
    loggedUserId
  }
}
