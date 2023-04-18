import { AuthenticationError } from "apollo-server";

export const checkIsLoggedIn = (loggedUserId) => {
  if (!loggedUserId) {
    throw new AuthenticationError('You must be logged in!');
  }
}

export const checkOwner = (userId, loggedUserId) => {

  checkIsLoggedIn()

  if (loggedUserId !== userId) {
    throw new AuthenticationError('You cannot delete this user!');
  }
}
