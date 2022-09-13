import { compare, hash } from 'bcryptjs';
interface passwords {
  password: string;
  passwordHash: string;
}
// gfuncion return string
const encrypt = async (password: string) => await hash(password, 10);

const verified = async ({ password, passwordHash }: passwords) =>
  await compare(password, passwordHash);

export { encrypt, verified };
