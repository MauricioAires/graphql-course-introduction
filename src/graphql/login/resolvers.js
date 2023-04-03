export const login = async (obj, { data }, { dataSources }, info) => {
  const { userName, password } = data;

  return dataSources.loginApi.login(userName, password);
};

export const loginResolvers = {
  Mutation: {
    login,
  },
};
