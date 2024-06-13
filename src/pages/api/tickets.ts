import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        try {
          const { name, email, description } = req.body;
          console.log("Creating ticket", { name, email, description });
          
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
      } else {
        try {
          const tickets = await prisma.ticket.findMany();
          res.json(tickets);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'An error occurred while retrieving the tickets.' });
        }
      }
};

export default handler;