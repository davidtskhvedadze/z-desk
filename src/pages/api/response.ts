import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => { 
    const { id, response } = req.body;

    try {
        const ticket = await prisma.ticket.update({
            where: {
                id,
            },
            data: {
                response,
            },
        });
        res.json(ticket);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while updating the ticket.' });
    }
};

export default handler;