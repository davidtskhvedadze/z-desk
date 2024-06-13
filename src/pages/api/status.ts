import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id, status } = req.body;
    console.log(id, status);

    try {
        const ticket = await prisma.ticket.update({
            where: {
                id,
            },
            data: {
                status,
            },
        });
        res.json(ticket);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while updating the ticket.' });
    }
}

export default handler;