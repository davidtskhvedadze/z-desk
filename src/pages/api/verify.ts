import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function verify(req: NextApiRequest, res: NextApiResponse) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET ?? 'defaultSecret') as JwtPayload;

    if (!decoded) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    return res.status(200).json({ message: 'Token is valid' });
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}