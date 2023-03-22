import DataLoader from 'dataloader';

export const makePostDataLoader = (getPosts) => {
  // NOTE: id dos usuários
  return new DataLoader(async (ids) => {
    const urlQuery = ids.join('&userId=');
    const url = `/?userId=${urlQuery}`;

    const response = await getPosts(url);

    const { data } = response;

    // NOTE: map porque eu previso retornar um valor para cada id de usuário
    return ids.map((id) => {
      return data.filter((post) => post.userId === id);
    });
  });
};
