import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

/**
 * NOTE: como compilar esse arquivo =>  yarn nodemon --exec babel-node bcrypt-jwt.js
 */

(async () => {
  const password = '12345';

  const passwordHash = await bcrypt.hash(password, 12);

  const userLoginPassword = '123456';

  const passwordIsValid = await bcrypt.compare(userLoginPassword, passwordHash);


})();

(async () => {
  const token = jwt.sign(
    {
      userId: '123',
    },
    'O_MEU_SECRET',
    {
      expiresIn: '7d',
    },
  );


  const tokenData = jwt.verify(token, 'O_MEU_SECRET');


})();
