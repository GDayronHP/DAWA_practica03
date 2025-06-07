import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (typeof id !== 'string') {
        return res.status(400).json({ error: 'Invalid ID' });
    }

    if (req.method === 'PUT') {
        try {
            const { CodLab, razonSocial, direccion, telefono, email, contacto } = req.body;
            const updatedLaboratorio = await prisma.laboratorio.update({
                where: { CodLab: Number(id) }, // Convert id to number
                data: { CodLab, razonSocial, direccion, telefono, email, contacto }
            });
            return res.status(200).json(updatedLaboratorio);
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    if (req.method === 'DELETE') {
        try {
            await prisma.laboratorio.delete({
                where: { CodLab: Number(id) } // Convert id to number
            });
            return res.status(204).end();
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    return res.status(405).json({ error: 'Method not allowed' });
}