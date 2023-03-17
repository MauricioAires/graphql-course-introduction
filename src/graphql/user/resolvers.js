const users = () => {
  return [
    {
      id: '1',
      userName: 'Mauricio Aires',
    },
    {
      id: '2',
      userName: 'Maria Dantas',
    },
  ];
};

const user = () => {
  return {
    id: '1',
    userName: 'Mauricio Aires',
  };
};

export const userResolvers = {
  Query: {
    user,
    users,
  },
};
