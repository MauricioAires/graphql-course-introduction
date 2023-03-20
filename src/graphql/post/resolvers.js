export const post = () => {
  return {
    id: '1',
    title: 'title',
  };
};

export const posts = () => {
  return [
    {
      id: '1',
      title: 'title',
    },
    {
      id: '2',
      title: 'title',
    },
  ];
};

export const postResolvers = {
  Query: {
    post,
    posts,
  },
};
