import axios from 'axios';

/**
 *
 * @param {*} obj
 * @param {*} arg
 * @param {*} context é utilizado para compartilhar através de todos
 * os resolvers
 * @returns
 */
const users = async (obj, arg, context, info) => {
  const response = await axios.get('http://localhost:3000/users');
  const { data } = response;

  return data;
};

const user = async () => {
  return {
    id: '1',
    userName: 'Mauricio Aires',
  };
};

export const userResolvers = {
  Query: {
    user,
    users,
  },
};
