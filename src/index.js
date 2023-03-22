import { ApolloServer } from 'apollo-server';
import { typeDefs, resolvers } from './graphql/schema';
import { context } from './context';

import * as dotenv from 'dotenv';

dotenv.config();

/**
 * NOTE: Tipos scalars são tipos primitivos de dados que representam valores únicos,
 * como String, Int, Float, Boolean e ID. Eles são usados para definir
 * os tipos de campos de objetos no schema do GraphQL e são
 * diferentes dos tipos de objeto personalizados, que representam objetos mais
 * complexos com seus próprios campos e valores. Os tipos scalars são usados
 * ​​para garantir que os dados sejam transmitidos com consistência * entre
 * o servidor e o cliente em uma consulta GraphQL.
 */

/**
 * NOTE: O graphQL assume que todos os valores são null, dessa forma caso queira
 * que um valor não seja retornado como null basta adicionar uma exclamação [!]
 * apos o tipo String! dessa forma irá gerar um erro caso o valor seja null
 */
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
});

server.listen(4003).then(({ url }) => {
  console.log(` Server listening on url: ${url} `);
});
