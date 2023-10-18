import jwt from 'jsonwebtoken';

type Payload = {
  id: number;
  username: string;
};

const secret = process.env.JWT_SECRET || 'secret';

const generate = (payload: Payload): string => {
  const token = jwt.sign(payload, secret);
  return token;
};

export default generate;
