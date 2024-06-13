import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => { 
    try {
        const tickets = await prisma.ticket.findMany();
        res.json(tickets);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while retrieving the tickets." });
    }
};

export default handler;