/*****************************************
 *  QUERIES RESOLVERS
 *****************************************/

/**
 *
 * @param {*} obj
 * @param {*} arg
 * @param {*} context é utilizado para compartilhar através de todos
 * os resolvers
 * @returns
 */
const users = async (obj, { inputs }, { dataSources }, info) => {
  const data = dataSources.usersApi.getUsers(inputs);

  return data;
};

/**
 *
 * @param {*} obj
 * @param {*} arg são os dados que são passados via props na query
 * @param {*} params
 * @returns
 */
const user = async (obj, { id }, { dataSources }) => {
  const data = dataSources.usersApi.getUser(id);

  return data;
};

/*****************************************
 *  MUTATION RESOLVERS
 *****************************************/

const createPost = async (obj, args, { dataSources }, info) => {
  console.log({ args });

  return {
    id: '342',
    title: 'Maiores ex tempore quo qui.',
    body: 'Earum natus quis possimus iusto voluptatem dicta. Facilis voluptate minima architecto similique quas. Tempora illum omnis aut et id minima nihil itaque quo. Dicta ratione ut voluptates quia harum voluptates qui.\n \rVoluptas velit qui eum sit voluptatem animi aut provident enim. Sed magnam reiciendis. Natus et fugit omnis quaerat iusto iste aliquam dignissimos magnam.',
    userId: '115',
    indexRef: 4,
    createdAt: '2016-06-05T20:17:46.223Z',
  };
};

/*****************************************
 *  FIELD RESOLVERS
 *****************************************/

const posts = async (obj, arg, { dataSources }, info) => {
  const { id } = obj;

  return dataSources.postsApi.postDataLoaderUserId(id);
};

export const userResolvers = {
  Query: {
    user,
    users,
  },
  Mutation: {
    createPost,
  },
  User: {
    posts,
  },
};
