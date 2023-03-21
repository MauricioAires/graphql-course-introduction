export const post = async (obj, { id }, { getPosts }, info) => {
  const response = await getPosts(`/${id}`);

  const { data } = response;

  return data;
};

export const posts = async (obj, args, { getPosts }, info) => {
  const response = await getPosts();

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
};
