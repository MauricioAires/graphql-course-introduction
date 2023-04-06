import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { RESTDataSource } from 'apollo-datasource-rest';
import { AuthenticationError } from 'apollo-server';

export class LoginApi extends RESTDataSource {
  constructor() {
    super();

    this.baseURL = `${process.env.API_BASE_URL}/users`;
  }


  async getUser(userName) {
    const user = await this.get(
      '',
      {
        _limit: 1,
        userName,
      },
      {
        cacheOptions: {
          ttl: 0,
        },
      },
    );

    const found = !!user.length;

    if (!found) {
      throw new AuthenticationError('User does not exist.');
    }

    return user[0];
  }

  async login(userName, password) {

    const user = await this.getUser(userName);

    const { passwordHash, id: userId } = user;

    const isPasswordValid = await this.checkUserPassword(password, passwordHash);

    if (!isPasswordValid) {
      throw new AuthenticationError('Invalid password.');
    }

    const token = this.createJwtToken({ userId });

    await this.patch(userId, {
      token
    }, {
      cacheOptions: {
        ttl: 0
      }
    })

    /**
     *
     * NOTE: para que o sandbox envie os cookies para o backend é preciso
     * ativar as configurações
     *
     * https://studio.apollographql.com/sandbox/explorer?overlay=connection-settings
     *
     * include cookies => on
     */

    // Response Header => Informando para o cliente criar um cookie

    this.context.res.cookie(
      'graphqlcursojsonwebtoken',
      token, {

      secure: true, // Serve para o navegador HTTPS => quando for para produção alterar  para true
      httpOnly: true, // Não deve ser acessado via código,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 dias,
      path: '/', // Pasta onde será acessada
      sameSite: 'none',
      /**
       * strict  => o cookie só pode ser usado dentro do seu
       * lax => a requisição é feita entre abas do navegador
       * none => pode fazer qualquer coisa com o cookie
       */
    }
    )

    return {
      userId,
      token: `Bearer ${token}`
    }
  }

  async logout(userName) {
    const user = await this.getUser(userName);

    if (user.id !== this.context.loggedUserId) {
      throw new AuthenticationError('You are not this user.');
    }

    await this.patch(user.id, {
      token: ''
    }, {
      cacheOptions: {
        ttl: 0
      }
    })

    return true
  }


  async checkUserPassword(password, passwordHash) {
    return bcrypt.compare(password, passwordHash);
  }

  createJwtToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
  }

}
