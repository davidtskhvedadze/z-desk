import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => { 
    const { id, response } = req.body;
    try {
        const newResponse = await prisma.response.create({
            data: {
                message: response,
                ticket: {
                    connect: {
                        id: id,
                    },
                },
            },
        });


        const ticket = await prisma.ticket.findUnique({
            where: {
                id: id,
            },
            include: {
                responses: true,
            },
        });

        res.json(newResponse);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while updating the ticket.' });
    }

};

export default handler;