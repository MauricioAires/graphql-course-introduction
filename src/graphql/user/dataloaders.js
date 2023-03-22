import DataLoader from 'dataloader';
/**
 * NOTE: O DataLoader faz cache das chamadas API
 */

/**
 * NOTE: é interessante que seja feito o cache apneas durante a consulta e quando
 * a consulta seja finalizado o cache deve ser removido.
 */

export const makeUserDataLoader = (getUsers) => {
  return new DataLoader(async (ids) => {
    const urlQuery = ids.join('&id=');

    const url = `/?id=${urlQuery}`;

    const response = await getUsers(url);

    const { data } = response;

    return ids.map((id) => data.find((user) => user.id === id));
  });
};
