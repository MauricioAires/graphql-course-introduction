/**
 *
 * @param {*} obj
 * @param {*} arg
 * @param {*} context é utilizado para compartilhar através de todos
 * os resolvers
 * @returns
 */
const users = async (obj, arg, { getUsers }, info) => {
  const response = await getUsers();
  const { data } = response;

  return data;
};

/**
 *
 * @param {*} obj
 * @param {*} arg são os dados que são passados via props na query
 * @param {*} params
 * @returns
 */
const user = async (obj, { id }, { getUsers }) => {
  const response = await getUsers(`/${id}`);
  const { data } = response;

  return data;
};

export const userResolvers = {
  Query: {
    user,
    users,
  },
};
