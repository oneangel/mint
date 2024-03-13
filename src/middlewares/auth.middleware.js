import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  // Obtén el token del encabezado de la solicitud
  const token = req.headers.authorization || '';
  console.log(token)

  // Verifica si no hay token
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verifica el token
    const decoded = jwt.verify(token, 'bXfZJKcD1PwsqLhntEA7m4eV9io6g3fp');

    // Agrega el usuario desde el token verificado a la solicitud
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

export default authMiddleware;
