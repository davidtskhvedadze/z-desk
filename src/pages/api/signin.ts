import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const { username, password } = req.body;

  const admin = await prisma.admin.findUnique({
    where: { username },
  });

  if (!admin) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }

  const validPassword = await bcrypt.compare(password, admin.password);

  if (!validPassword) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }

  const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET ?? 'defaultSecret', {
    expiresIn: '1d'
  });

  res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=${24 * 60 * 60}`);

  res.status(200).json({ message: 'Login successful' });
}