import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => { 
  const { username, password } = req.body;
    const admin = await prisma.admin.findUnique({
        where: {
        username,
        },
    });

    if (!admin) {
        return res.status(401).json({ message: "Invalid username or password" });
    }
    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid username or password" });
    }

    return res.status(200).json({ message: 'User authenticated' });
};


export default handler;