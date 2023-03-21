export const post = async (obj, { id }, { getPosts }, info) => {
  try {
    const response = await getPosts(`/${id}`);

    const { data } = response;

    if (typeof data.id === 'undefined') {
      return {
        statusCode: 404,
        message: 'post not found!',
      };
    }

    return data;
  } catch (err) {
    return {
      statusCode: 404,
      message: 'post not found!',
    };
  }
};

export const posts = async (obj, { inputs }, { getPosts }, info) => {
  const apiFiltersInputs = new URLSearchParams(inputs);

  const response = await getPosts(`/?${apiFiltersInputs}`);

  const { data } = response;

  return data;
};

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
export const postResolvers = {
  Query: {
    post,
    posts,
  },
  Post: {
    unixTimestamp: ({ createdAt }) => {
      return new Date(createdAt).getTime();
    },
  },
  PostResult: {
    __resolveType: (obj) => {
      if (typeof obj.statusCode !== 'undefined') return 'PostNotFoundError';
      if (typeof obj.id !== 'undefined') return 'Post';

      /**
       * NOTE: Caso não retorne um valor e retorne null o graphQL vai gerar seu
       * próprio error
       */
      return null; // GraphQLError is thrown
    },
  },
};
