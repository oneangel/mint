import jwt from 'jsonwebtoken';

const getToken = (payload) => {
  return jwt.sign({
    data: payload
  }, 'bXfZJKcD1PwsqLhntEA7m4eV9io6g3fp',
    { expiresIn: '1d' });
}

const getTokenData = (token) => {
  let data = null;
  jwt.verify(token, 'bXfZJKcD1PwsqLhntEA7m4eV9io6g3fp', (err, decode) => {
    if (err) {
      console.log('Error getting token data');
    } else {
      data = decode;
    }
  });
  return data;
}

export { getToken, getTokenData }