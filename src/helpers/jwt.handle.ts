import { sign, verify } from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'firma';

const GenerateToken = async (id: string) => {
  const jwt = sign({ id }, JWT_SECRET, {
    expiresIn: '24h',
  });
  return jwt;
};

const verifyToken = (jwt: string) => {
  return verify(jwt, JWT_SECRET);
};

export { GenerateToken, verifyToken };
