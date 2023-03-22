/**
 *
 * @param {*} obj
 * @param {*} arg
 * @param {*} context é utilizado para compartilhar através de todos
 * os resolvers
 * @returns
 */
const users = async (obj, { inputs }, { getUsers }, info) => {
  const apiFiltersInputs = new URLSearchParams(inputs);

  const response = await getUsers(`/?${apiFiltersInputs}`);
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

const posts = async (obj, arg, { postDataLoader }, info) => {
  const { id } = obj;

  return postDataLoader.load(id);
};

export const userResolvers = {
  Query: {
    user,
    users,
  },
  User: {
    posts,
  },
};
