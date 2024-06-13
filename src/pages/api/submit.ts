import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
        try {
          const { name, email, description } = req.body;      
          const ticket = await prisma.ticket.create({
            data: {
              name,
              email,
              description,
            },
          });
          res.json(ticket);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'An error occurred while creating the ticket.' });
        }
};

export default handler;