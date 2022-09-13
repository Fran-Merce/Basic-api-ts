import { sign, verify } from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'firma';
const GenerateToken = async (id: string) => {
  const jwt =  sign({ id }, JWT_SECRET, {
    expiresIn: '2h',
  }); 
  return jwt
};

const verifyToken = async () => {};

export { GenerateToken, verifyToken };
