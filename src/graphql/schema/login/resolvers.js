import { checkOwner } from './utils/auth-functions'

export const login = async (obj, { data }, { dataSources }, info) => {
  const { userName, password } = data;

  return dataSources.loginApi.login(userName, password);
};

export const logout = async (obj, { userName }, { dataSources }, info) => {
  return dataSources.loginApi.logout(userName);
};

export const loginResolvers = {
  Mutation: {
    login,
    logout
  },
};
