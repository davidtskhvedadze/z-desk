import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { id } = req.body;
        await prisma.response.deleteMany({
            where: {
                ticketId: id
            }
        });
        await prisma.ticket.delete({
            where: {
                id
            }
        });

        res.status(200).json({ message: "Ticket deleted" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete ticket" });
    }  
        
}

export default handler;