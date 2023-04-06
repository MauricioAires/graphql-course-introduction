import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { RESTDataSource } from 'apollo-datasource-rest';
import { AuthenticationError } from 'apollo-server';
import { checkOwner } from './utils/auth-functions'

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

    return {
      userId,
      token: `Bearer ${token}`
    }
  }

  async logout(userName) {
    const user = await this.getUser(userName);

    console.log({ user })

    if (user.id, this.context.loggedUserId) {
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
