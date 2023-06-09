/*****************************************
 *  QUERY RESOLVERS
 *****************************************/

import { AuthenticationError } from "apollo-server";
import { checkIsLoggedIn } from "../login/utils/auth-functions";

// export const post = async (obj, { id }, { getPosts }, info) => {
//   try {
//     const response = await getPosts(`/${id}`);

//     const { data } = response;

//     return data;
//   } catch (err) {
//     const { data } = err;

//     if (data === undefined) {
//       return {
//         statusCode: 404,
//         message: 'not found error!',
//         postId: id,
//       };
//     }

//     return {
//       statusCode: 500,
//       message: 'timeout error!',
//       timeout: 300,
//     };
//   }
// };

export const post = async (obj, { id }, { dataSources }, info) => {
  const post = dataSources.postsApi.getPost(id);

  return post;
};

export const posts = async (obj, { inputs }, { dataSources }, info) => {
  const response = dataSources.postsApi.getPosts(inputs);

  return response;
};

/*****************************************
 *  MUTATION RESOLVERS
 *****************************************/

const createPost = async (obj, { data }, { dataSources, loggedUserId }, info) => {

  checkIsLoggedIn(loggedUserId)

  data.userId = loggedUserId

  return dataSources.postsApi.createPost(data);
};

const updatePost = async (obj, { postId, data }, { dataSources, loggedUserId }, info) => {

  checkIsLoggedIn(loggedUserId)

  return dataSources.postsApi.updatePost(postId, data);
};

const deletePost = async (obj, { postId }, { dataSources, loggedUserId }, info) => {

  checkIsLoggedIn(loggedUserId)

  return dataSources.postsApi.deletePost(postId);
};

/*****************************************
 *  FIELD RESOLVERS
 *****************************************/

/**
 * Em GraphQL, um resolvedor trivial é uma função que é capaz de retornar
 * diretamente o valor desejado sem precisar realizar nenhum processamento
 * adicional. Por exemplo, se uma consulta GraphQL solicita o nome de um usuário
 * e esse nome já está disponível em uma variável, um resolvedor trivial pode
 * simplesmente retornar o valor da variável sem precisar fazer qualquer busca ou
 * manipulação de dados. Em resumo, um resolvedor trivial é uma função que resolve uma
 * consulta GraphQL de forma direta e rápida, sem a necessidade de realizar cálculos
 * complexos ou acessar bancos de dados externos.
 *
 * Aplicabilidade: o primeiro parâmetro content os dados retornados para cada
 * objeto, dessa forma pode ser utilizado para formatar valores ou concatenar um
 * nome e sobre nome
 */

/**
 * NOTE: object => são os dados do objeto resolvido no resolver top level
 * args => são os parâmetros repassados do front end
 * context => são as informação compartilhadas pelo Apollo Server (nas suas definições)
 */

const user = async (obj, arg, { dataSources }, info) => {
  const { userId } = obj;

  return dataSources.usersApi.userDataLoaderPostId(userId);
};

const comments = async ({ id: post_id }, arg, { dataSources }, info) => {

  return dataSources.commentDB.batchLoad(post_id)
}

export const postResolvers = {
  // NOME DO TYPE => Resolvers de entrada
  Query: {
    post,
    posts,
  },
  Mutation: {
    createPost,
    updatePost,
    deletePost,
  },

  // NOTE: Resolvers trivial
  Post: {
    user,
    comments
  },

  // NOME DO TYPE
  // Post: {
  //   unixTimestamp: ({ createdAt }) => {
  //     return new Date(createdAt).getTime();
  //   },
  // },
  //  NOME DO UNION
  // PostResult: {
  //   __resolveType: (obj) => {
  //     if (typeof obj.postId !== 'undefined') return 'PostNotFoundError';
  //     if (typeof obj.timeout !== 'undefined') return 'PostTimeoutError';
  //     if (typeof obj.id !== 'undefined') return 'Post';

  //     /**
  //      * NOTE: Caso não retorne um valor e retorne null o graphQL vai gerar seu
  //      * próprio error
  //      */
  //     return null; // GraphQLError is thrown
  //   },
  // },
  // // NOME DA INTERFACE
  // PostError: {
  //   __resolveType: (obj) => {
  //     if (typeof obj.postId !== 'undefined') return 'PostNotFoundError';
  //     if (typeof obj.timeout !== 'undefined') return 'PostTimeoutError';

  //     return null; // GraphQLError is thrown
  //   },
  // },
};
