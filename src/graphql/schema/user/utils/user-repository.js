import { UserInputError, ValidationError } from 'apollo-server';
import bcrypt from 'bcrypt';

export const createUserFn = async (userData, dataSource) => {
  await checkUserFields(userData, true);

  const indexRefUser = await dataSource.get('', {
    limit: 1,
    _sort: 'indexRef',
    _order: 'desc',
  });

  const indexRef = indexRefUser[0].indexRef + 1;

  const foundUser = await userExists(userData.userName, dataSource);

  if (typeof foundUser !== 'undefined') {
    throw new ValidationError(
      `userName ${userData.userName} has already been taken`,
    );
  }

  return await dataSource.post('', {
    ...userData,
    indexRef,
    createdAt: new Date().toISOString(),
  });
};

export const updateUserFn = async (userId, userData, dataSource) => {
  await checkUserFields(userData, false);

  if (!userId) {
    throw new ValidationError(`Missing userId`);
  }

  if (userData.userName) {
    const foundUser = await userExists(userData.userName, dataSource);

    if (typeof foundUser !== 'undefined' && foundUser.id !== userId) {
      throw new ValidationError(
        `userName ${userData.userName} has already been taken`,
      );
    }
  }

  return await dataSource.patch(userId, { ...userData });
};

export const deleteUserFn = async (userId, dataSource) => {
  if (!userId) {
    throw new ValidationError(`Missing userId`);
  }

  const deleted = await dataSource.delete(userId);

  return !!deleted;
};

const userExists = async (userName, dataSource) => {
  const user = await dataSource.context.dataSources.usersApi.get('', {
    userName,
  });

  return user[0];
};

const validateUserName = (userName) => {
  const userNameRegExp = /^[a-z]([a-z0-9_.-]+)+$/gi;

  if (!userName.match(userNameRegExp)) {
    throw new ValidationError(`userName must match ${userNameRegExp}`);
  }
};

const validateUserPassword = async (password) => {
  // Letra minúscula, letra maiúscula e número

  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,30}$/;


  if (!password.match(strongPasswordRegex)) {
    throw new UserInputError(
      `Password must contain at least: One lower case letter, onde upper case letter and one number.`,
    );
  }
};

const checkUserFields = async (user, allFieldsRequired = false) => {
  const userFields = ['firstName', 'lastName', 'userName', 'password'];

  for (const field of userFields) {
    if (!allFieldsRequired) {
      if (typeof user[field] === 'undefined') {
        continue;
      }
    }

    if (field === 'userName') {
      validateUserName(user[field]);
    }

    if (field === 'password') {
      await validateUserPassword(user[field]);
    }

    if (!user[field]) {
      throw new Error(`Missing ${field}`);
    }
  }

  if (user.password && !user.passwordHash) {
    const { password } = user;

    const passwordHash = await bcrypt.hash(password, 12);

    user.passwordHash = passwordHash;

    delete user['password'];
  }
};
