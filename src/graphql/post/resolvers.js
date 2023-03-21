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

export const postResolvers = {
  Query: {
    post,
    posts,
  },
};
